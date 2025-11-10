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
          Delete
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
            <div class="stat-item">
              <span class="stat-label">Member Since</span>
              <span class="stat-value">{{ customer?.createdAt || 'N/A' }}</span>
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
import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt?: string
}

interface StorageUnit {
  id: number
  unitNumber: string
  size: string
  status: string
  monthlyRate: number
  building?: string
  customer?: string
}

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
    
    // Fetch customer details
    const customerResponse = await axios.get(`http://localhost:4000/customers/${customerId}`)
    customer.value = customerResponse.data

    // Populate edit form
        editForm.value = {
          name: customer.value?.name ?? '',
          email: customer.value?.email ?? '',
          phone: customer.value?.phone ?? '',
          address: customer.value?.address ?? ''
        }

    // Fetch all storage units and filter by customer name
    const unitsResponse = await axios.get('http://localhost:4000/storageUnits')
    assignedUnits.value = unitsResponse.data.filter(
      (unit: StorageUnit) => unit.customer === customer.value?.name
    )

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
    await axios.put(`http://localhost:4000/customers/${customerId}`, editForm.value)
    
    // Update local customer data
    if (customer.value) {
      customer.value.name = editForm.value.name
      customer.value.email = editForm.value.email
      customer.value.phone = editForm.value.phone
      customer.value.address = editForm.value.address
    }

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
    await axios.delete(`http://localhost:4000/customers/${customerId}`)
    
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

<style scoped>
.customer-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.customer-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #002e5f;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.back-link:hover {
  color: #002e5f;
  transform: translateX(-4px);
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.action-btn.secondary {
  background: white;
  border: 2px solid #e7e5e4;
  color: #78716c;
}

.action-btn.secondary:hover {
  border-color: #002e5f;
  color: #002e5f;
  transform: translateY(-2px);
}

.action-btn.danger {
  background: white;
  border: 2px solid #fee2e2;
  color: #dc2626;
}

.action-btn.danger:hover {
  border-color: #dc2626;
  background: #fef2f2;
  transform: translateY(-2px);
}

.error-text {
  color: #dc2626;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #fee2e2;
}

.customer-detail-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.customer-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.customer-info-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.customer-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f5f5f4;
}

.customer-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 2rem;
  flex-shrink: 0;
}

.customer-name-large {
  font-size: 2rem;
  font-weight: 700;
  color: #292524;
  margin: 0 0 0.5rem;
}

.customer-id-large {
  color: #78716c;
  font-size: 0.875rem;
  margin: 0;
}

.contact-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  gap: 1rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 46, 95, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #002e5f;
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  color: #a8a29e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.detail-value {
  display: block;
  font-size: 1rem;
  color: #292524;
  font-weight: 500;
}

.storage-units-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f5f5f4;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #292524;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title svg {
  color: #002e5f;
}

.units-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-item {
  background: linear-gradient(180deg, #fafaf9 0%, #ffffff 100%);
  border: 2px solid #e7e5e4;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s;
}

.unit-item:hover {
  border-color: #002e5f;
  transform: translateX(4px);
}

.unit-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.unit-number-badge {
  font-size: 1.125rem;
  font-weight: 700;
  color: #292524;
}

.unit-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.unit-status.occupied {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.unit-status.available {
  background: rgba(8, 145, 178, 0.1);
  color: #0891b2;
}

.unit-status.overdue {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
}

.unit-item-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-specs {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.spec {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-label {
  font-size: 0.75rem;
  color: #78716c;
  font-weight: 500;
}

.spec-value {
  font-size: 0.875rem;
  color: #292524;
  font-weight: 600;
}

.spec-value.price {
  color: #002e5f;
  font-size: 1rem;
}

.view-unit-link {
  color: #002e5f;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
  width: fit-content;
}

.view-unit-link:hover {
  transform: translateX(4px);
}

.empty-units {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
}

.empty-units svg {
  color: #d6d3d1;
  margin-bottom: 1rem;
}

.empty-units p {
  color: #a8a29e;
  font-size: 0.875rem;
  margin: 0;
}

.customer-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: #292524;
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-title svg {
  color: #002e5f;
}

.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #fafaf9;
  border-radius: 10px;
}

.stat-label {
  font-size: 0.875rem;
  color: #78716c;
  font-weight: 500;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #002e5f;
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
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e7e5e4;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #292524;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #78716c;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f5f5f4;
  color: #292524;
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
  color: #292524;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e7e5e4;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #002e5f;
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
  background: white;
  border: 2px solid #e7e5e4;
  color: #78716c;
}

.btn-secondary:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.btn-primary {
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(22, 64, 249, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22, 64, 249, 0.4);
}

@media (max-width: 1024px) {
  .customer-detail-content {
    grid-template-columns: 1fr;
  }

  .customer-sidebar {
    order: -1;
  }

  .contact-details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .customer-detail-container {
    padding: 1rem;
  }

  .customer-detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .customer-profile {
    flex-direction: column;
    text-align: center;
  }

  .customer-name-large {
    font-size: 1.5rem;
  }
}
</style>