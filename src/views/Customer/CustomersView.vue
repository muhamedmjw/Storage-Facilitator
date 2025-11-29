<template>
  <div class="customers-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Customers</h1>
        <p class="page-subtitle">Manage customer profiles and rental history</p>
      </div>
      <button class="add-customer-btn" @click="showAddModal = true">
        <Plus class="icon" />
        Add Customer
      </button>
    </div>

    <div class="controls-section">
      <div class="search-box">
        <Search class="icon" />
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
              <Mail class="icon" />
              <span class="info-text">{{ customer.email }}</span>
            </div>
            <div class="info-row">
              <Phone class="icon" />
              <span class="info-text">{{ customer.phone }}</span>
            </div>
            <div class="info-row">
              <MapPin class="icon" />
              <span class="info-text">{{ customer.address }}</span>
            </div>
          </div>
        </div>

        <div class="customer-card-footer">
          <button class="action-btn secondary" @click="viewCustomer(customer.id)">
            <Eye class="icon" />
            View Details
          </button>
        </div>
      </div>

      <div v-if="filteredCustomers.length === 0" class="empty-state">
        <X class="icon" />
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
            <X class="icon" />
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

  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '@/services/customerService'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import type { Customer } from '@/types'
import { Plus, Search, Mail, Phone, MapPin, Eye, X } from 'lucide-vue-next'

const router = useRouter()
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const customers = ref<Customer[]>([])
const search = ref('')
const showAddModal = ref(false)


const page = ref(1)
const perPage = ref(6)

const newCustomer = ref({
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


watch(search, () => {
  page.value = 1
})

</script>


<style scoped src="../../assets/styles/pages/Customer/CustomersView.css">

</style>