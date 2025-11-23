<template>
  <div class="customer-detail-container">
    <div class="customer-detail-header">
      <router-link to="/customers" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Customers
      </router-link>

      <div class="header-actions">
        <button class="action-btn secondary" @click="showEditModal = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Customer
        </button>
        <button class="action-btn danger" @click="confirmDelete">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete Customer
        </button>
      </div>
    </div>

    <div v-if="error" class="error-text">{{ error }}</div>

    <div v-else class="customer-detail-content">
      <div class="customer-main">
        <!-- Customer Info Card -->
        <div class="customer-info-section">
          <div class="customer-profile">
            <div class="customer-avatar-large">
              {{ customer?.name?.slice(0, 2).toUpperCase() || 'NA' }}
            </div>
            <div class="customer-info-main">
              <h1 class="customer-name-large">{{ customer?.name || 'Unknown Customer' }}</h1>
              <p class="customer-id-large">Customer ID: #{{ customer?.id || '000' }}</p>
            </div>
          </div>

          <div class="contact-details-grid">
            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span class="detail-label">Email Address</span>
                <span class="detail-value">{{ customer?.email || 'N/A' }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span class="detail-label">Phone Number</span>
                <span class="detail-value">{{ customer?.phone || 'N/A' }}</span>
              </div>
            </div>

            <div class="detail-item full-width">
              <div class="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span class="detail-label">Address</span>
                <span class="detail-value">{{ customer?.address || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Storage Units Section -->
        <div class="storage-units-section">
          <div class="section-header">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Assigned Storage Units
            </h3>
          </div>

          <div v-if="assignedUnits.length > 0" class="units-list">
            <div v-for="unit in assignedUnits" :key="unit.id" class="unit-item">
              <div class="unit-item-header">
                <div class="unit-number-badge">{{ unit.unitNumber }}</div>
                <span class="unit-status" :class="unit.status">{{ unit.status }}</span>
              </div>
              <div class="unit-item-body">
                <div class="unit-specs">
                  <div class="spec">
                    <span class="spec-label">Size:</span>
                    <span class="spec-value">{{ unit.size }}</span>
                  </div>
                  <div class="spec">
                    <span class="spec-label">Monthly Rate:</span>
                    <span class="spec-value price">${{ unit.monthlyRate }}</span>
                  </div>
                  <div class="spec" v-if="unit.building">
                    <span class="spec-label">Building:</span>
                    <span class="spec-value">{{ unit.building }}</span>
                  </div>
                </div>
                <router-link :to="`/storages/${unit.id}`" class="view-unit-link">
                  View Unit Details →
                </router-link>
              </div>
            </div>
          </div>

          <div v-else class="empty-units">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <p>No storage units assigned to this customer yet.</p>
          </div>
        </div>
      </div>

      <!-- Sidebar with Activity -->
      <div class="customer-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Account Summary
          </h3>
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Active Units</span>
              <span class="stat-value">{{ assignedUnits.filter(u => u.status === 'occupied').length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Units</span>
              <span class="stat-value">{{ assignedUnits.length }}</span>
            </div>
          </div>
        </div>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { customerService } from '@/services/customerService'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import type { Customer, StorageUnit } from '@/types'


const route = useRoute()
const router = useRouter()
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

const customer = ref<Customer | null>(null)
const assignedUnits = ref<StorageUnit[]>([])
const error = ref<string | null>(null)
const showEditModal = ref(false)
const editForm = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

onMounted(async () => {
  await loadCustomerData()
})

const loadCustomerData = async () => {
  startLoading()

  try {
    const customerId = route.params.id as string
    customer.value = await customerService.getById(customerId)
    editForm.value = {
      name: customer.value?.name ?? '',
      email: customer.value?.email ?? '',
      phone: customer.value?.phone ?? '',
      address: customer.value?.address ?? ''
    }
    showToast('Customer details loaded successfully!', 'success')
    
  } catch (err) {
    error.value = 'Failed to load customer data.'
    showToast('Failed to load customer details.', 'error')
    console.error(err)

  } finally {
    stopLoading()
  }
}

const updateCustomer = async () => {
  startLoading()

  try {
    const customerId = route.params.id as string
    await customerService.update(customerId, editForm.value)
    if (customer.value) {
      customer.value.name = editForm.value.name
      customer.value.email = editForm.value.email
      customer.value.phone = editForm.value.phone
      customer.value.address = editForm.value.address
    }
    await loadCustomerData()
    showEditModal.value = false
    showToast('Customer updated successfully!', 'success')

  } catch (err) {
    showToast('Failed to update customer.', 'error')
    console.error(err)

  } finally {
    stopLoading()
  }
}

const confirmDelete = () => {
  if (confirm(`Are you sure you want to delete ${customer.value?.name}? This action cannot be undone.`)) {
    deleteCustomer()
  }
}

const deleteCustomer = async () => {
  startLoading()
  try {
    const customerId = route.params.id as string
    await customerService.delete(customerId)
    showToast('Customer deleted successfully!', 'success')
    router.push('/customers')

  } catch (err) {
    showToast('Failed to delete customer.', 'error')
    console.error(err)

  } finally {
    stopLoading()
  }
}
</script>


<style scoped src="../../assets/styles/pages/customer/CustomerDetailView.css">

</style>