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
            <select v-model="form.customerId" required>
              <option value="" disabled>Select customer</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Storage Unit *</label>
            <select v-model="form.storageId" required>
              <option value="" disabled>Select storage</option>
              <option v-for="s in storages" :key="s.id" :value="s.id">{{ s.unitNumber }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount (IQD) *</label>
            <input v-model.number="form.amount" type="number" min="1" required>
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

    console.log('✅ Transactions loaded:', transactions.value.length)
    showToast('Data loaded successfully!', 'success')
  } catch (error) {
    console.error('Error loading data:', error)
    showToast('Some data could not be loaded', 'error')
  } finally {
    stopLoading()
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

const openCreateModal = () => {
  if (customers.value.length === 0) {
    showToast('No customers available. Please add customers first.', 'error')
    return
  }
  if (storages.value.length === 0) {
    showToast('No storage units available. Please add storage units first.', 'error')
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
    const status = await paymentService.checkPaymentStatus(transaction.paymentId)
    const updated = await paymentService.update(transaction.id, {
      status: status.status,
      paidAt: status.paidAt
    })
    const index = transactions.value.findIndex(t => t.id === transaction.id)
    if (index !== -1) transactions.value[index] = updated
    showToast(`Status: ${status.status}`, 'success')
  } catch {
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

<style scoped>
.transactions-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-background);
  color: var(--color-text);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--color-text-light);
  font-size: 1rem;
}

.add-transaction-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.add-transaction-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.controls-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-lighter);
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid var(--color-input-border);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: var(--color-input-bg);
  color: var(--color-text);
}

.search-input::placeholder {
  color: var(--color-text-lighter);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(22, 26, 249, 0.1);
}

.transactions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.transaction-card {
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
}

.transaction-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-secondary);
}

.transaction-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--gradient-surface);
  border-bottom: 1px solid var(--color-border);
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-info {
  flex: 1;
}

.transaction-id {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.transaction-date {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin: 0;
}

.status-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.paid {
  background: var(--color-available-bg);
  color: var(--color-available);
}

.status-badge.unpaid {
  background: var(--color-occupied-bg);
  color: var(--color-occupied);
}

.status-badge.declined {
  background: var(--color-overdue-bg);
  color: var(--color-overdue);
}

.transaction-card-body {
  padding: 1.5rem;
  flex: 1;
}

.transaction-details {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  color: var(--color-text);
  font-weight: 600;
}

.detail-value.price {
  color: var(--color-secondary);
  font-size: 1.125rem;
}

.transaction-card-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.action-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.action-btn.secondary:hover:not(:disabled) {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
}

.action-btn.primary {
  background: var(--gradient-primary);
  border: none;
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  grid-column: 1 / -1;
}

.empty-state svg {
  color: var(--color-text-disabled);
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--color-text-lighter);
  font-size: 1rem;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--color-surface);
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-light);
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-input-border);
  border-radius: 10px;
  font-size: 1rem;
  background-color: var(--color-input-bg);
  color: var(--color-text);
  transition: all 0.2s;
}

.form-group select {
  cursor: pointer;
}

.form-group input::placeholder {
  color: var(--color-text-lighter);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(22, 26, 249, 0.1);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.btn-secondary:hover {
  border-color: var(--color-error);
  color: var(--color-error);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.pagination-btn,
.pagination-page {
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.35rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled),
.pagination-page:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px rgba(22, 26, 249, 0.25);
  transform: translateY(-1px);
}

.pagination-page.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: #ffffff;
  box-shadow: var(--shadow-sm);
  cursor: default;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: default;
  transform: none;
  box-shadow: none;
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .transactions-container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .add-transaction-btn {
    width: 100%;
    justify-content: center;
  }

  .transactions-grid {
    grid-template-columns: 1fr;
  }
}
</style>