<template>
  <div class="transactions-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Transactions</h1>
        <p class="page-subtitle">Manage FIB payment transactions</p>
      </div>
      <button class="add-transaction-btn" @click="openCreateModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Create Payment
      </button>
    </div>

    <div class="controls-section">
      <div class="search-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search transactions..."
          class="search-input"
        >
      </div>
    </div>

    <div class="transactions-grid">
      <div
        v-for="transaction in paginatedTransactions"
        :key="transaction.id"
        class="transaction-card"
      >
        <div class="transaction-card-header">
          <div class="transaction-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div class="transaction-info">
            <h3 class="transaction-id">{{ transaction.readableCode || transaction.id.slice(0, 8) }}</h3>
            <p class="transaction-date">{{ formatDate(transaction.createdAt) }}</p>
          </div>
          <div class="status-badge" :class="transaction.status.toLowerCase()">
            {{ transaction.status }}
          </div>
        </div>

        <div class="transaction-card-body">
          <div class="transaction-details">
            <div class="detail-row">
              <span class="detail-label">Customer:</span>
              <span class="detail-value">{{ transaction.customerName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Storage:</span>
              <span class="detail-value">{{ transaction.storageName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value price">{{ transaction.amount }} IQD</span>
            </div>
          </div>
        </div>

        <div class="transaction-card-footer">
          <button class="action-btn secondary" @click="checkStatus(transaction)" :disabled="loading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Check Status
          </button>
          <button v-if="transaction.status === 'PAID'" class="action-btn primary" @click="refund(transaction)" :disabled="loading">
            Refund
          </button>
          <button v-if="transaction.status === 'UNPAID'" class="action-btn primary" @click="cancel(transaction)" :disabled="loading">
            Cancel
          </button>
        </div>
      </div>

      <div v-if="filteredTransactions.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <p>No transactions found.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="pagination-btn" :disabled="page === 1" @click="page--">‹ Prev</button>
      <div class="pagination-pages">
        <button v-for="p in totalPages" :key="p" class="pagination-page" :class="{ active: p === page }" @click="page = p">
          {{ p }}
        </button>
      </div>
      <button class="pagination-btn" :disabled="page === totalPages" @click="page++">Next ›</button>
    </div>

    <!-- Create Payment Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Create New Payment</h2>
          <button class="close-btn" @click="showCreateModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="createPayment" class="modal-form">
          <div class="form-group">
            <label>Customer *</label>
            <select v-model="form.customerId" required @change="onCustomerChange">
              <option value="" disabled>Select customer</option>
              <option v-for="c in customersWithStorage" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Storage Unit *</label>
            <select v-model="form.storageId" required @change="onStorageChange" :disabled="!form.customerId">
              <option value="" disabled>Select storage</option>
              <option v-for="s in customerStorages" :key="s.id" :value="s.id">
                {{ s.unitNumber }} - {{ s.monthlyRate }} IQD
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount (IQD) *</label>
            <input v-model.number="form.amount" type="number" min="1" required readonly>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input v-model="form.description" type="text" placeholder="Optional">
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showCreateModal = false">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="loading">Create Payment</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import { paymentService } from '@/services/PaymentService'
import type { Transaction, Customer, StorageUnit } from '@/types'

const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const API_URL = 'http://localhost:4000'

const transactions = ref<Transaction[]>([])
const customers = ref<Customer[]>([])
const storages = ref<StorageUnit[]>([])
const search = ref('')
const showCreateModal = ref(false)
const loading = ref(false)
const page = ref(1)
const perPage = ref(6)

const form = ref({
  customerId: '',
  storageId: '',
  amount: 0,
  description: ''
})

onMounted(() => {
  loadData()
})

const loadData = async () => {
  startLoading()
  try {
    // Load transactions
    const txData = await paymentService.getAll()
    transactions.value = txData

    // Load customers
    await loadCustomersAndStorages()

    console.log('✅ Transactions loaded:', transactions.value.length)
    showToast('Data loaded successfully!', 'success')
  } catch (error) {
    console.error('Error loading data:', error)
    showToast('Some data could not be loaded', 'error')
  } finally {
    stopLoading()
  }
}

// ✅ NEW: Separate function to reload customers and storages
const loadCustomersAndStorages = async () => {
  try {
    const custResponse = await axios.get(`${API_URL}/customers`)
    customers.value = custResponse.data
    console.log('✅ Customers loaded:', customers.value.length)
  } catch (err) {
    console.warn('Could not load customers:', err)
    customers.value = []
  }

  // Load storages - try different endpoint names
  try {
    const storResponse = await axios.get(`${API_URL}/storageUnits`)
    storages.value = storResponse.data
    console.log('✅ Storages loaded:', storages.value.length)
  } catch {
    try {
      const storResponse = await axios.get(`${API_URL}/storages`)
      storages.value = storResponse.data
      console.log('✅ Storages loaded:', storages.value.length)
    } catch (err2) {
      console.warn('Could not load storages:', err2)
      storages.value = []
    }
  }
}

// ✅ Only show customers who have at least one storage unit
const customersWithStorage = computed(() => {
  return customers.value.filter(customer => {
    // Check if this customer has any storage units
    return storages.value.some(storage => 
      storage.customer === customer.name
    )
  })
})

// ✅ Get storage units for the selected customer only
const customerStorages = computed(() => {
  if (!form.value.customerId) return []
  
  const selectedCustomer = customers.value.find(c => c.id === form.value.customerId)
  if (!selectedCustomer) return []

  // Filter storages that belong to this customer
  return storages.value.filter(storage =>
    storage.customer === selectedCustomer.name 
  )
})

// ✅ When customer changes, reset storage and amount
const onCustomerChange = () => {
  form.value.storageId = ''
  form.value.amount = 0
}

// ✅ When storage is selected, auto-fill the monthly rent
const onStorageChange = () => {
  const selectedStorage = storages.value.find(s => s.id.toString() === form.value.storageId)
  if (selectedStorage) {
    form.value.amount = selectedStorage.monthlyRate
  }
}

const filteredTransactions = computed(() => {
  const term = search.value.toLowerCase()
  return transactions.value.filter(t =>
    t.customerName?.toLowerCase().includes(term) ||
    t.storageName?.toLowerCase().includes(term) ||
    t.id.toLowerCase().includes(term) ||
    (t.readableCode && t.readableCode.toLowerCase().includes(term))
  )
})

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / perPage.value))

const paginatedTransactions = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredTransactions.value.slice(start, start + perPage.value)
})

// ✅ MODIFIED: Reload data when opening modal to get latest customer assignments
const openCreateModal = async () => {
  // Reload customers and storages to get latest assignments
  startLoading()
  await loadCustomersAndStorages()
  stopLoading()

  if (customersWithStorage.value.length === 0) {
    showToast('No customers with storage units available.', 'error')
    return
  }
  showCreateModal.value = true
}

const createPayment = async () => {
  loading.value = true
  startLoading()
  try {
    const customer = customers.value.find(c => c.id === form.value.customerId)
    const storage = storages.value.find(s => s.id.toString() === form.value.storageId)

    if (!customer || !storage) {
      showToast('Invalid customer or storage selection', 'error')
      return
    }

    // Call FIB API (mock)
    const fibResponse = await paymentService.createPayment({
      customerId: form.value.customerId,
      storageId: form.value.storageId,
      amount: form.value.amount,
      description: form.value.description
    })

    // Save to local database
    const transaction: Transaction = {
      id: Date.now().toString(),
      customerId: form.value.customerId,
      customerName: customer.name,
      storageId: form.value.storageId,
      storageName: storage.unitNumber,
      amount: form.value.amount,
      status: 'UNPAID',
      paymentId: fibResponse.paymentId,
      readableCode: fibResponse.readableCode,
      qrCode: fibResponse.qrCode,
      validUntil: fibResponse.validUntil,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const saved = await paymentService.save(transaction)
    transactions.value.unshift(saved)

    showCreateModal.value = false
    form.value = { customerId: '', storageId: '', amount: 0, description: '' }
    showToast('Payment created successfully! ✅', 'success')
  } catch (error) {
    console.error('Failed to create payment:', error)
    showToast('Failed to create payment', 'error')
  } finally {
    loading.value = false
    stopLoading()
  }
}

const checkStatus = async (transaction: Transaction) => {
  if (!transaction.paymentId) return
  loading.value = true
  try {
    // ✅ First, reload storage data to get latest customer assignments
    await loadCustomersAndStorages()
    
    // ✅ Check if customer has been reassigned to this storage
    const storage = storages.value.find(s => s.id.toString() === transaction.storageId)
    let updatedCustomerName = transaction.customerName
    
    if (storage && storage.customer && storage.customer !== transaction.customerName) {
      updatedCustomerName = storage.customer
      console.log(`🔄 Customer reassigned: ${transaction.customerName} → ${storage.customer}`)
    }
    
    // ✅ Check payment status with FIB
    const status = await paymentService.checkPaymentStatus(transaction.paymentId)
    
    // ✅ Update both status AND customer name
    const updated = await paymentService.update(transaction.id, {
      status: status.status,
      paidAt: status.paidAt,
      customerName: updatedCustomerName // Update customer name too
    })
    
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) transactions.value[index] = updated
    
    // ✅ Show appropriate message
    if (updatedCustomerName !== transaction.customerName) {
      showToast(`Status: ${status.status} | Customer updated to ${updatedCustomerName}`, 'success')
    } else {
      showToast(`Status: ${status.status}`, 'success')
    }
  } catch (error) {
    console.error('Failed to check status:', error)
    showToast('Failed to check status', 'error')
  } finally {
    loading.value = false
  }
}

const cancel = async (transaction: Transaction) => {
  if (!confirm('Cancel this payment?')) return
  loading.value = true
  try {
    await paymentService.cancelPayment(transaction.paymentId!)
    const updated = await paymentService.update(transaction.id, { status: 'DECLINED' })
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) transactions.value[index] = updated
    showToast('Payment cancelled', 'success')
  } catch {
    showToast('Failed to cancel', 'error')
  } finally {
    loading.value = false
  }
}

const refund = async (transaction: Transaction) => {
  if (!confirm('Refund this payment?')) return
  loading.value = true
  try {
    await paymentService.refundPayment(transaction.paymentId!)
    const updated = await paymentService.update(transaction.id, { status: 'DECLINED' })
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) transactions.value[index] = updated
    showToast('Payment refunded', 'success')
  } catch {
    showToast('Failed to refund', 'error')
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped src="../../assets/styles/pages/Transaction/TransactionView.css">

</style>