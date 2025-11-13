<template>
  <div class="customers-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Customers</h1>
        <p class="page-subtitle">Manage customer profiles and rental history</p>
      </div>
      <button class="add-customer-btn" @click="showAddModal = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Customer
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
          placeholder="Search customers by name, email, or phone..."
          class="search-input"
        >
      </div>
    </div>

    <div class="customers-grid">
      <div
        v-for="customer in paginatedCustomers"
        :key="customer.id"
        class="customer-card"
      >
        <div class="customer-card-header">
          <div class="customer-avatar">
            {{ customer.name.slice(0, 2).toUpperCase() }}
          </div>
          <div class="customer-info">
            <h3 class="customer-name">{{ customer.name }}</h3>
            <p class="customer-id">ID: #{{ customer.id }}</p>
          </div>
        </div>

        <div class="customer-card-body">
          <div class="contact-info">
            <div class="info-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span class="info-text">{{ customer.email }}</span>
            </div>
            <div class="info-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span class="info-text">{{ customer.phone }}</span>
            </div>
            <div class="info-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span class="info-text">{{ customer.address }}</span>
            </div>
          </div>
        </div>

        <div class="customer-card-footer">
          <button class="action-btn secondary" @click="viewCustomer(customer.id)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Details
          </button>
        </div>
      </div>

      <div v-if="filteredCustomers.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <p>No customers found.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
  <button
    class="pagination-btn"
    :disabled="page === 1"
    @click="page--"
  >
    ‹ Prev
  </button>

  <div class="pagination-pages">
    <button
      v-for="p in totalPages"
      :key="p"
      class="pagination-page"
      :class="{ active: p === page }"
      @click="page = p"
    >
      {{ p }}
    </button>
  </div>

  <button
    class="pagination-btn"
    :disabled="page === totalPages"
    @click="page++"
  >
    Next ›
  </button>
</div>


    <!-- Add Customer Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Add New Customer</h2>
          <button class="close-btn" @click="showAddModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="addCustomer" class="modal-form">
          <div class="form-group">
            <label>Full Name *</label>
            <input v-model="newCustomer.name" type="text" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="newCustomer.email" type="email" required >
          </div>
          <div class="form-group">
            <label>Phone *</label>
            <input v-model="newCustomer.phone" type="tel" required>
          </div>
          <div class="form-group">
            <label>Address *</label>
            <input v-model="newCustomer.address" type="text" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="btn-primary">Add Customer</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Customer Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="showEditModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Edit Customer</h2>
          <button class="close-btn" @click="showEditModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="updateCustomer" class="modal-form">
          <div class="form-group">
            <label>Full Name *</label>
            <input v-model="editForm.name" type="text" required>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="editForm.email" type="email" required>
          </div>
          <div class="form-group">
            <label>Phone *</label>
            <input v-model="editForm.phone" type="tel" required>
          </div>
          <div class="form-group">
            <label>Address *</label>
            <input v-model="editForm.address" type="text" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showEditModal = false">Cancel</button>
            <button type="submit" class="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import type { Customer } from '@/types'

const router = useRouter()
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const customers = ref<Customer[]>([])
const search = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingCustomerId = ref<string | null>(null)

const page = ref(1)
const perPage = ref(6)

const newCustomer = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const editForm = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

onMounted(async () => {
  await loadCustomers()
})

const loadCustomers = async () => {
  startLoading()
  try {
    const response = await axios.get('http://localhost:4000/customers')
    customers.value = response.data
    showToast('Customers loaded successfully!', 'success')
  } catch (error) {
    console.error('Failed to load customers:', error)
    showToast('Failed to load customers.', 'error')
  } finally {
    stopLoading()
  }
}

const filteredCustomers = computed(() => {
  const term = search.value.toLowerCase()
  return customers.value.filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.email.toLowerCase().includes(term) ||
    c.phone.includes(term)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredCustomers.value.length / perPage.value)
)

const paginatedCustomers = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredCustomers.value.slice(start, start + perPage.value)
})

const addCustomer = async () => {
  startLoading()
  try {
    const response = await axios.post('http://localhost:4000/customers', newCustomer.value)
    customers.value.push(response.data)
    showAddModal.value = false
    newCustomer.value = { name: '', email: '', phone: '', address: '' }
    showToast('Customer added successfully!', 'success')
  } catch (error) {
    console.error('Failed to add customer:', error)
    showToast('Failed to add customer.', 'error')
  } finally {
    stopLoading()
  }
}

const viewCustomer = (customerId: string) => {
  router.push(`/customers/${customerId}`)
}

const updateCustomer = async () => {
  if (!editingCustomerId.value) return

  startLoading()
  try {
    const response = await axios.put(
      `http://localhost:4000/customers/${editingCustomerId.value}`,
      editForm.value
    )

    const index = customers.value.findIndex(c => c.id === editingCustomerId.value)
    if (index !== -1) {
      customers.value[index] = response.data
    }

    showEditModal.value = false
    editingCustomerId.value = null
    showToast('Customer updated successfully!', 'success')
  } catch (error) {
    console.error('Failed to update customer:', error)
    showToast('Failed to update customer.', 'error')
  } finally {
    stopLoading()
  }
}

watch(search, () => {
  page.value = 1
})

</script>

<style scoped>
.customers-container {
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

.add-customer-btn {
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

.add-customer-btn:hover {
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

.customers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.customer-card {
  background: var(--color-surface);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
}

.customer-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-secondary);
}

.customer-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--gradient-surface);
  border-bottom: 1px solid var(--color-border);
}

.customer-avatar {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.customer-id {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin: 0;
}

.customer-card-body {
  padding: 1.5rem;
  flex: 1;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-light);
}

.info-row svg {
  color: var(--color-secondary);
  flex-shrink: 0;
}

.info-text {
  font-size: 0.875rem;
  color: var(--color-text);
}

.customer-card-footer {
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

.action-btn.secondary {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.action-btn.secondary:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
}

.action-btn.primary {
  background: var(--gradient-primary);
  border: none;
  color: white;
}

.action-btn.primary:hover {
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

/* Modal Styles */
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

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-input-border);
  border-radius: 10px;
  font-size: 1rem;
  background-color: var(--color-input-bg);
  color: var(--color-text);
  transition: all 0.2s;
}

.form-group input::placeholder {
  color: var(--color-text-lighter);
}

.form-group input:focus {
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

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .customers-container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .add-customer-btn {
    width: 100%;
    justify-content: center;
  }

  .customers-grid {
    grid-template-columns: 1fr;
  }
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

.pagination-btn:hover,
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

</style>
