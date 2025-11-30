<template>
  <div class="transactions-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Payment Transactions</h1>
        <p class="page-subtitle">Manage customer payments and track transaction history</p>
      </div>
      <button class="create-payment-btn" @click="showCreateModal = true">
        <Plus class="icon" />
        Create Payment
      </button>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filter-tabs">
        <button 
          v-for="status in ['All', 'UNPAID', 'PAID', 'DECLINED']" 
          :key="status"
          :class="['filter-tab', { active: filterStatus === status }]"
          @click="filterStatus = status"
        >
          {{ status }}
          <span class="filter-count">{{ getCountByStatus(status) }}</span>
        </button>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="transactions-list">
      <TransactionCard
        v-for="transaction in filteredTransactions" 
        :key="transaction.id"
        :transaction="transaction"
        @view="viewTransaction"
        @refresh="handleRefreshStatus"
        @cancel="handleCancelTransaction"
      />

      <div v-if="filteredTransactions.length === 0" class="empty-state">
        <X class="icon" />
        <p>No transactions found</p>
      </div>
    </div>

    <!-- Create Payment Modal -->
    <CreatePaymentModal
      v-if="showCreateModal"
      :customers="customers"
      :storage-units="storageUnits"
      @close="showCreateModal = false"
      @submit="handleCreatePayment"
    />

    <!-- View Transaction Modal -->
    <ViewTransactionModal
      v-if="showViewModal && selectedTransaction"
      :transaction="selectedTransaction"
      @close="showViewModal = false"
      @refresh="handleRefreshStatus"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { paymentService } from '@/services/PaymentService'
import type { Transaction } from '@/types'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import { useTransactions } from '@/composables/useTransactions'
import { Plus, X } from 'lucide-vue-next'
import TransactionCard from '@/components/transaction/TransactionCard.vue'
import CreatePaymentModal from '@/components/transaction/CreatePaymentModal.vue'
import ViewTransactionModal from '@/components/transaction/ViewTransactionModal.vue'

const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const {
  transactions,
  customers,
  storageUnits,
  filterStatus,
  filteredTransactions,
  getCountByStatus,
  loadData,
  checkPaymentStatus,
  cancelTransaction
} = useTransactions()

const showCreateModal = ref(false)
const showViewModal = ref(false)
const selectedTransaction = ref<Transaction | null>(null)

onMounted(async () => {
  await loadData()
})

const viewTransaction = (transaction: Transaction) => {
  selectedTransaction.value = transaction
  showViewModal.value = true
}

const handleRefreshStatus = async (transaction: Transaction) => {
  const updated = await checkPaymentStatus(transaction)
  if (updated && selectedTransaction.value?.id === transaction.id) {
    selectedTransaction.value = updated
  }
}

const handleCancelTransaction = async (transaction: Transaction) => {
  const updated = await cancelTransaction(transaction)
  if (updated && selectedTransaction.value?.id === transaction.id) {
    showViewModal.value = false
  }
}

const handleCreatePayment = async (form: any) => {
  startLoading()
  try {
    const selectedCustomer = customers.value.find(c => c.id === form.customerId)
    const selectedUnit = storageUnits.value.find(u => u.id.toString() === form.storageId)
    
    if (!selectedCustomer || !selectedUnit) {
      showToast('Invalid customer or storage unit selection', 'error')
      return
    }
    
    const transaction = await paymentService.createPayment(form)
    
    const updatedTransaction = await paymentService.update(transaction.id, {
      customerName: selectedCustomer.name,
      storageName: selectedUnit.unitNumber
    })
    
    transactions.value.unshift(updatedTransaction)
    showCreateModal.value = false
    showToast('Payment created successfully!', 'success')
    
    selectedTransaction.value = updatedTransaction
    showViewModal.value = true
  } catch (error) {
    console.error('Failed to create payment:', error)
    showToast('Failed to create payment. Check your FIB credentials.', 'error')
  } finally {
    stopLoading()
  }
}
</script>

<style  src="../../assets/styles/pages/Transaction/TransactionView.css">
</style>
