<template>
  <div class="transactions-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Payment Transactions</h1>
        <p class="page-subtitle">Manage customer payments and track transaction history</p>
      </div>
      <button class="create-payment-btn" @click="showCreateModal = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
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
      <div 
        v-for="transaction in filteredTransactions" 
        :key="transaction.id"
        class="transaction-card"
        @click="viewTransaction(transaction)"
      >
        <div class="transaction-header">
          <div class="transaction-info">
            <h3 class="customer-name">{{ transaction.customerName || 'Loading...' }}</h3>
            <p class="storage-info">{{ transaction.storageName || 'Unit Info' }}</p>
          </div>
          <div :class="['status-badge', transaction.status.toLowerCase()]">
            {{ transaction.status }}
          </div>
        </div>

        <div class="transaction-body">
          <div class="transaction-details">
            <div class="detail-item">
              <span class="detail-label">Amount:</span>
              <span class="detail-value amount">${{ transaction.amount.toFixed(2) }} IQD</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Created:</span>
              <span class="detail-value">{{ formatDate(transaction.createdAt) }}</span>
            </div>
            <div class="detail-item" v-if="transaction.paidAt">
              <span class="detail-label">Paid At:</span>
              <span class="detail-value">{{ formatDate(transaction.paidAt) }}</span>
            </div>
            <div class="detail-item" v-if="transaction.readableCode">
              <span class="detail-label">Payment Code:</span>
              <span class="detail-value code">{{ transaction.readableCode }}</span>
            </div>
          </div>
        </div>

        <div class="transaction-actions">
          <button 
            v-if="transaction.status === 'UNPAID'" 
            class="action-btn primary"
            @click.stop="checkPaymentStatus(transaction)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Refresh Status
          </button>
          <button 
            v-if="transaction.status === 'UNPAID'" 
            class="action-btn secondary"
            @click.stop="cancelTransaction(transaction)"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-if="filteredTransactions.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
        <p>No transactions found</p>
      </div>
    </div>

    <!-- Create Payment Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Create Payment Transaction</h2>
          <button class="close-btn" @click="showCreateModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createPayment" class="modal-form">
          <div class="form-group">
            <label>Customer *</label>
            <select v-model="paymentForm.customerId" @change="onCustomerChange" required>
              <option value="">Select customer</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                {{ customer.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Storage Unit *</label>
            <select 
              v-model="paymentForm.storageId" 
              @change="onStorageChange"
              :disabled="!paymentForm.customerId || availableStorageUnits.length === 0"
              required
            >
              <option value="">
                {{ !paymentForm.customerId 
                  ? 'Select a customer first' 
                  : availableStorageUnits.length === 0 
                    ? 'No storage units assigned to this customer' 
                    : 'Select storage unit' 
                }}
              </option>
              <option v-for="unit in availableStorageUnits" :key="unit.id" :value="unit.id">
                {{ unit.unitNumber }} - ${{ unit.monthlyRate }}/month
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Amount (IQD) *</label>
            <input 
              v-model.number="paymentForm.amount" 
              type="number" 
              step="0.01"
              required
              placeholder="Enter amount"
            />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea 
              v-model="paymentForm.description"
              rows="3"
              placeholder="Optional payment description..."
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showCreateModal = false">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Create Payment
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Transaction Modal -->
    <div v-if="showViewModal && selectedTransaction" class="modal-overlay" @click="showViewModal = false">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <div>
            <h2>Payment Details</h2>
            <p class="modal-subtitle">Transaction ID: {{ selectedTransaction.id }}</p>
          </div>
          <button class="close-btn" @click="showViewModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="transaction-details-view">
          <!-- QR Code Section -->
          <div v-if="selectedTransaction.qrCode && selectedTransaction.status === 'UNPAID'" class="qr-section">
            <h3>Scan to Pay</h3>
            <img :src="selectedTransaction.qrCode" alt="Payment QR Code" class="qr-code"/>
            <p class="qr-instructions">
              Scan this QR code with the FIB mobile app to complete payment
            </p>
            <div class="readable-code">
              <span class="code-label">Or enter code manually:</span>
              <span class="code-value">{{ selectedTransaction.readableCode }}</span>
            </div>
          </div>

          <!-- Transaction Info -->
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Customer</span>
              <span class="info-value">{{ selectedTransaction.customerName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Storage Unit</span>
              <span class="info-value">{{ selectedTransaction.storageName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Amount</span>
              <span class="info-value amount">${{ selectedTransaction.amount }} IQD</span>
            </div>
            <div class="info-item">
              <span class="info-label">Status</span>
              <span :class="['status-badge', selectedTransaction.status.toLowerCase()]">
                {{ selectedTransaction.status }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Created</span>
              <span class="info-value">{{ formatDate(selectedTransaction.createdAt) }}</span>
            </div>
            <div class="info-item" v-if="selectedTransaction.paidAt">
              <span class="info-label">Paid At</span>
              <span class="info-value">{{ formatDate(selectedTransaction.paidAt) }}</span>
            </div>
            <div class="info-item" v-if="selectedTransaction.validUntil">
              <span class="info-label">Valid Until</span>
              <span class="info-value">{{ formatDate(selectedTransaction.validUntil) }}</span>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button 
            v-if="selectedTransaction.status === 'UNPAID'" 
            type="button" 
            class="btn-secondary"
            @click="checkPaymentStatus(selectedTransaction)"
          >
            Refresh Status
          </button>
          <button type="button" class="btn-primary" @click="showViewModal = false">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { paymentService } from '@/services/PaymentService'
import { customerService } from '@/services/customerService'
import { storageService } from '@/services/storageService'
import type { Transaction, Customer, StorageUnit } from '@/types'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'

const _router = useRouter()
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const transactions = ref<Transaction[]>([])
const customers = ref<Customer[]>([])
const storageUnits = ref<StorageUnit[]>([])
const filterStatus = ref('All')
const showCreateModal = ref(false)
const showViewModal = ref(false)
const selectedTransaction = ref<Transaction | null>(null)

const paymentForm = ref({
  customerId: '',
  storageId: '',
  amount: 0,
  description: ''
})

// Computed property to filter storage units based on selected customer
const availableStorageUnits = computed(() => {
  if (!paymentForm.value.customerId) {
    return []
  }
  
  const selectedCustomer = customers.value.find(c => c.id === paymentForm.value.customerId)
  if (!selectedCustomer) {
    return []
  }
  
  // Filter storage units that belong to the selected customer
  return storageUnits.value.filter(unit => 
    unit.customer === selectedCustomer.name || 
    unit.email === selectedCustomer.email
  )
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  startLoading()
  try {
    const [transactionsData, customersData, unitsData] = await Promise.all([
      paymentService.getAll(),
      customerService.getAll(),
      storageService.getUnits()
    ])
    
    transactions.value = transactionsData
    customers.value = customersData
    storageUnits.value = unitsData
    
    showToast('Data loaded successfully', 'success')
  } catch (error) {
    console.error('Failed to load data:', error)
    showToast('Failed to load data', 'error')
  } finally {
    stopLoading()
  }
}

const filteredTransactions = computed(() => {
  if (filterStatus.value === 'All') {
    return transactions.value
  }
  return transactions.value.filter(t => t.status === filterStatus.value)
})

const getCountByStatus = (status: string) => {
  if (status === 'All') return transactions.value.length
  return transactions.value.filter(t => t.status === status).length
}

// Reset storage selection when customer changes
const onCustomerChange = () => {
  paymentForm.value.storageId = ''
  paymentForm.value.amount = 0
}

// Auto-fill amount when storage unit is selected
const onStorageChange = () => {
  if (paymentForm.value.storageId) {
    const selectedUnit = availableStorageUnits.value.find(
      unit => unit.id.toString() === paymentForm.value.storageId
    )
    if (selectedUnit) {
      paymentForm.value.amount = selectedUnit.monthlyRate
    }
  } else {
    paymentForm.value.amount = 0
  }
}

const createPayment = async () => {
  startLoading()
  try {
    // Get customer and storage unit details
    const selectedCustomer = customers.value.find(c => c.id === paymentForm.value.customerId)
    const selectedUnit = storageUnits.value.find(u => u.id.toString() === paymentForm.value.storageId)
    
    if (!selectedCustomer || !selectedUnit) {
      showToast('Invalid customer or storage unit selection', 'error')
      return
    }
    
    // Create the payment transaction
    const transaction = await paymentService.createPayment({
      customerId: paymentForm.value.customerId,
      storageId: paymentForm.value.storageId,
      amount: paymentForm.value.amount,
      description: paymentForm.value.description
    })
    
    // Update the transaction with customer and storage names
    const updatedTransaction = await paymentService.update(transaction.id, {
      customerName: selectedCustomer.name,
      storageName: selectedUnit.unitNumber
    })
    
    transactions.value.unshift(updatedTransaction)
    showCreateModal.value = false
    showToast('Payment created successfully!', 'success')
    
    // Show the QR code modal
    selectedTransaction.value = updatedTransaction
    showViewModal.value = true
    
    // Reset form
    paymentForm.value = {
      customerId: '',
      storageId: '',
      amount: 0,
      description: ''
    }
  } catch (error) {
    console.error('Failed to create payment:', error)
    showToast('Failed to create payment. Check your FIB credentials.', 'error')
  } finally {
    stopLoading()
  }
}

const viewTransaction = (transaction: Transaction) => {
  selectedTransaction.value = transaction
  showViewModal.value = true
}

const checkPaymentStatus = async (transaction: Transaction) => {
  startLoading()
  try {
    const status = await paymentService.checkPaymentStatus(transaction.paymentId!)
    
    // Update transaction status
    const updated = await paymentService.update(transaction.id, {
      status: status as "UNPAID" | "PAID" | "DECLINED",
      paidAt: status === 'PAID' ? new Date().toISOString() : undefined
    })
    
    // Update in list
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) {
      transactions.value[index] = updated
    }
    
    if (selectedTransaction.value?.id === transaction.id) {
      selectedTransaction.value = updated
    }
    
    showToast(`Payment status: ${status}`, status === 'PAID' ? 'success' : 'info')
  } catch (error) {
    console.error('Failed to check status:', error)
    showToast('Failed to check payment status', 'error')
  } finally {
    stopLoading()
  }
}

const cancelTransaction = async (transaction: Transaction) => {
  if (!confirm('Are you sure you want to cancel this payment?')) return
  
  startLoading()
  try {
    if (transaction.paymentId) {
      await paymentService.cancelPayment(transaction.paymentId)
    }
    await paymentService.update(transaction.id, { status: 'DECLINED' })
    
    // Reload data
    await loadData()
    showToast('Payment cancelled successfully', 'success')
  } catch (error) {
    console.error('Failed to cancel payment:', error)
    showToast('Failed to cancel payment', 'error')
  } finally {
    stopLoading()
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>

<style scoped src="../../assets/styles/pages/Transaction/TransactionView.css">
</style>