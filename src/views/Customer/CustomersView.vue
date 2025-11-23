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
import { customerService } from '@/services/customerService'
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
    customers.value = await customerService.getAll()
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
    const customerToAdd = {
      ...newCustomer.value,
      createdAt: new Date().toISOString()
    }
    const added = await customerService.add(customerToAdd)
    customers.value.push(added)
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
    const updated = await customerService.update(editingCustomerId.value, editForm.value)
    const index = customers.value.findIndex(c => c.id === editingCustomerId.value)
    if (index !== -1) {
      customers.value[index] = updated
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


<style scoped src="../../assets/styles/pages/Customer/CustomersView.css">

</style>