<template>
  <div class="unit-detail-container">
    <div class="unit-detail-header">
      <router-link
        to="/storages"
        class="back-link"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
          />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Units
      </router-link>

      <div class="header-actions">
        <button 
          class="action-btn secondary"
          @click="openEditModal"
          :disabled="!canEdit"
          :title="!canEdit ? getDisabledMessage() : 'Edit Unit'"
          :class="{ 'btn-disabled': !canEdit }"
        >
          <!-- ... svg icon -->
          Edit Unit
        </button>
        <button 
          class="action-btn danger"
          @click="handleDeleteUnit"
          :disabled="!canDelete"
          :title="!canDelete ? getDisabledMessage() : 'Delete Unit'"
          :class="{ 'btn-disabled': !canDelete }"
        >
          <!-- ... svg icon -->
          Delete Unit
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="_error"
      class="error-text"
    >
      {{ _error }}
    </div>

    <!-- Main Content -->
    <div
      v-else
      class="unit-detail-content"
    >
      <div class="unit-main">
        <!-- Unit Info -->
        <div class="unit-title-section">
          <div class="unit-header-row">
            <h1 class="unit-title">
              {{ unit?.unitNumber || 'Unknown Unit' }}
            </h1>
            <div
              class="status-badge"
              :class="unit?.status || 'available'"
            >
              {{ unit?.status || 'available' }}
            </div>
          </div>
          <div class="unit-specs">
            <div class="spec-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                />
              </svg>
              <span>{{ unit?.size || 'Unknown size' }}</span>
            </div>
            <div class="spec-item">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span>{{ unit?.building || '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="customer-section">
          <div class="section-header">
            <div class="section-header-content">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />
                </svg>
                Customer Information
              </h3>
              <button 
                class="assign-customer-btn"
                @click="openAssignCustomerModal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Assign Customer
              </button>
            </div>
          </div>

          <div class="customer-card">
            <div class="customer-header">
              <div class="customer-avatar-large">
                {{ (unit?.customer || 'NA').slice(0, 2).toUpperCase() }}
              </div>
              <div class="customer-info-main">
                <h4 class="customer-name">
                  {{ unit?.customer || 'No Customer' }}
                </h4>
                <p class="customer-id">
                  Customer ID: #{{ unit?.id || '000' }}
                </p>
              </div>
            </div>

            <div class="customer-details-grid">
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ unit?.email || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">{{ unit?.phone || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Address</span>
                <span class="detail-value">{{ unit?.address || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Customer Since</span>
                <span class="detail-value">{{ unit?.createdAt || '—' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Rental Info -->
        <div class="rental-section">
          <div class="section-header">
            <h3 class="section-title">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                />
              </svg>
              Rental Details
            </h3>
          </div>

          <div class="rental-details-card">
            <div class="rental-grid">
              <div class="rental-item">
                <span class="rental-label">Start Date</span>
                <span class="rental-value">{{ unit?.startDate || 'Unknown' }}</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Monthly Rate</span>
                <span class="rental-value price">${{ unit?.monthlyRate ?? 0 }}</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Next Payment Due</span>
                <span class="rental-value">{{ unit?.nextPayment || '—' }}</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Payment Status</span>
                <span
                  class="payment-badge"
                  :class="unit?.paymentStatus || 'available'"
                >
                  {{ unit?.paymentStatus || unit?.status || 'available' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar (Notes + Activity Log) -->
      <div class="unit-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Activity Log
          </h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-content">
                <p><strong>Payment received</strong> - ${{ unit?.monthlyRate ?? 0 }}</p>
                <span class="activity-time">Recent Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Unit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Edit Storage Unit</h2>
          <button class="modal-close" @click="closeEditModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleUpdateUnit" class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Unit Number</label>
              <input
                v-model="editForm.unitNumber"
                type="text"
                class="form-input"
                placeholder="e.g., A-101"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Size</label>
              <input
                v-model="editForm.size"
                type="text"
                class="form-input"
                placeholder="e.g., 5x10 ft"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Monthly Rate ($)</label>
              <input
                v-model="editForm.monthlyRate"
                type="number"
                class="form-input"
                placeholder="0.00"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Status</label>
              <select v-model="editForm.status" class="form-input">
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Payment Status</label>
              <select v-model="editForm.paymentStatus" class="form-input">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Building</label>
              <input
                v-model="editForm.building"
                type="text"
                class="form-input"
                placeholder="e.g., Building A"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Access Instructions</label>
              <input
                v-model="editForm.accessInstructions"
                type="text"
                class="form-input"
                placeholder="e.g., Gate code: 1234"
              />
            </div>
          </div>

          <div class="form-group full-width">
            <label class="form-label">Description</label>
            <textarea
              v-model="editForm.description"
              class="form-textarea"
              rows="3"
              placeholder="Additional details..."
            ></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeEditModal">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Assign Customer Modal - Step 1/2 -->
    <div v-if="showAssignCustomerModal && assignmentStep === 1" class="modal-overlay" @click="closeAssignCustomerModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Assign Customer</h2>
            <p class="modal-subtitle">Step 1/2 - Select Customer</p>
          </div>
          <button class="modal-close" @click="closeAssignCustomerModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="search-box-modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              v-model="customerSearch"
              type="text"
              placeholder="Search customers by name or email..."
              class="search-input-modal"
            />
          </div>

          <div class="customer-list">
            <div
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="customer-item"
              @click="selectCustomer(customer)"
            >
              <div class="customer-checkbox">
                <input
                  type="radio"
                  :id="`customer-${customer.id}`"
                  :value="customer.id"
                  v-model="selectedCustomerId"
                  class="checkbox-input"
                />
                <label :for="`customer-${customer.id}`" class="checkbox-label"></label>
              </div>
              <div class="customer-avatar">
                {{ (customer.name || 'NA').slice(0, 2).toUpperCase() }}
              </div>
              <div class="customer-details">
                <div class="customer-name-text">{{ customer.name }}</div>
                <div class="customer-email">{{ customer.email }}</div>
              </div>
            </div>
          </div>

          <div v-if="filteredCustomers.length === 0" class="empty-customers">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p>No customers found</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeAssignCustomerModal">
              Cancel
            </button>
            <button 
              type="button" 
              class="btn-primary" 
              @click="goToStep2"
              :disabled="!selectedCustomerId"
            >
              Next
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Customer Modal - Step 2/2 -->
    <div v-if="showAssignCustomerModal && assignmentStep === 2" class="modal-overlay" @click="closeAssignCustomerModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Assign Customer</h2>
            <p class="modal-subtitle">Step 2/2 - Rental Details</p>
          </div>
          <button class="modal-close" @click="closeAssignCustomerModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleAssignCustomer" class="modal-body">
          <div class="selected-customer-info">
            <div class="customer-avatar">
              {{ (selectedCustomerData?.name || 'NA').slice(0, 2).toUpperCase() }}
            </div>
            <div>
              <div class="customer-name-text">{{ selectedCustomerData?.name }}</div>
              <div class="customer-email">{{ selectedCustomerData?.email }}</div>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label">Start Date *</label>
              <input
                v-model="rentalDetails.startDate"
                type="date"
                class="form-input"
                required
                @change="calculateNextPayment"
              />
            </div>

            <div class="form-group full-width">
              <label class="form-label">Next Payment Due</label>
              <input
                v-model="rentalDetails.nextPayment"
                type="date"
                class="form-input"
                readonly
              />
              <span class="form-hint">Automatically calculated as 1 month from start date</span>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="goToStep1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
            <button type="submit" class="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Assign Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { storageService } from '@/services/storageService'
import type { StorageUnit } from '@/services/storageService'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'
import type { Customer } from '@/types'
import { usePermissions } from '@/composables/usePermissions'


const { canEdit, canDelete, getDisabledMessage } = usePermissions()
const route = useRoute()
const router = useRouter()
const unit = ref<StorageUnit | null>(null)
const _error = ref<string | null>(null)
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

// Edit Modal
const showEditModal = ref(false)
const editForm = ref({
  unitNumber: '',
  size: '',
  monthlyRate: 0,
  status: 'available' as 'available' | 'occupied' | 'overdue',
  paymentStatus: 'available' as string,
  building: '',
  accessInstructions: '',
  description: ''
})

// Assign Customer Modal
const showAssignCustomerModal = ref(false)
const assignmentStep = ref(1)
const customers = ref<Customer[]>([])
const customerSearch = ref('')
const selectedCustomerId = ref<string | null>(null)
const selectedCustomerData = ref<Customer | null>(null)
const rentalDetails = ref({
  startDate: '',
  nextPayment: ''
})

const filteredCustomers = computed(() => {
  if (!customerSearch.value) {
    return customers.value
  }
  const search = customerSearch.value.toLowerCase()
  return customers.value.filter(customer =>
    customer.name.toLowerCase().includes(search) ||
    customer.email.toLowerCase().includes(search)
  )
})

onMounted(async () => {
  startLoading()
  try {
    const id = route.params.id as string
    const res: AxiosResponse<StorageUnit> = await storageService.getUnitById(id)
    unit.value = res.data
    showToast(`Loaded details for unit ${unit.value.unitNumber}`, 'success')
  } catch (err: unknown) {
    _error.value = err instanceof Error ? err.message : 'Failed to load unit data.'
    showToast('Failed to load unit details.', 'error')
  } finally {
    stopLoading()
  }
})

// Load customers from db.json via API
const loadCustomers = async () => {
  try {
    const response = await axios.get('http://localhost:4000/customers')
    customers.value = response.data
  } catch (error) {
    console.error('Failed to load customers:', error)
    showToast('Failed to load customers.', 'error')
    customers.value = []
  }
}

// Calculate next payment date (1 month from start date)
const calculateNextPayment = () => {
  if (rentalDetails.value.startDate) {
    const startDate = new Date(rentalDetails.value.startDate)
    const nextPayment = new Date(startDate)
    nextPayment.setMonth(nextPayment.getMonth() + 1)
    rentalDetails.value.nextPayment = nextPayment.toISOString().split('T')[0]
  }
}

// Edit Modal Functions
const openEditModal = () => {
  if (unit.value) {
    editForm.value = {
      unitNumber: unit.value.unitNumber || '',
      size: unit.value.size || '',
      monthlyRate: unit.value.monthlyRate || 0,
      status: unit.value.status || 'available',
      paymentStatus: unit.value.paymentStatus || unit.value.status || 'available',
      building: unit.value.building || '',
      accessInstructions: unit.value.accessInstructions || '',
      description: unit.value.description || ''
    }
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const handleUpdateUnit = async () => {
  if (!unit.value?.id) {
    showToast('Cannot update unit: Invalid unit ID', 'error')
    return
  }

  startLoading()
  try {
    // Preserve existing customer data when updating unit
    const payload: Partial<StorageUnit> = {
      unitNumber: editForm.value.unitNumber,
      size: editForm.value.size,
      monthlyRate: Number(editForm.value.monthlyRate),
      status: editForm.value.status,
      paymentStatus: editForm.value.paymentStatus,
      building: editForm.value.building,
      accessInstructions: editForm.value.accessInstructions,
      description: editForm.value.description,
      // Preserve customer information
      customer: unit.value.customer,
      email: unit.value.email,
      phone: unit.value.phone,
      address: unit.value.address,
      startDate: unit.value.startDate,
      nextPayment: unit.value.nextPayment
    }

    await storageService.updateUnit(unit.value.id, payload)
    
    // Reload unit data
    const res: AxiosResponse<StorageUnit> = await storageService.getUnitById(unit.value.id.toString())
    unit.value = res.data
    
    showToast('Storage unit updated successfully!', 'success')
    closeEditModal()
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update storage unit.'
    showToast(errorMessage, 'error')
  } finally {
    stopLoading()
  }
}

// Assign Customer Modal Functions
const openAssignCustomerModal = async () => {
  await loadCustomers()
  assignmentStep.value = 1
  showAssignCustomerModal.value = true
}

const closeAssignCustomerModal = () => {
  showAssignCustomerModal.value = false
  assignmentStep.value = 1
  customerSearch.value = ''
  selectedCustomerId.value = null
  selectedCustomerData.value = null
  rentalDetails.value = {
    startDate: '',
    nextPayment: ''
  }
}

const selectCustomer = (customer: Customer) => {
  selectedCustomerId.value = customer.id
}

const goToStep2 = () => {
  if (!selectedCustomerId.value) {
    showToast('Please select a customer', 'error')
    return
  }
  
  selectedCustomerData.value = customers.value.find(c => c.id === selectedCustomerId.value) || null
  
  // Set default start date to today
  const today = new Date()
  rentalDetails.value.startDate = today.toISOString().split('T')[0]
  calculateNextPayment()
  
  assignmentStep.value = 2
}

const goToStep1 = () => {
  assignmentStep.value = 1
}

const handleAssignCustomer = async () => {
  if (!selectedCustomerId.value || !unit.value?.id) {
    showToast('Please select a customer', 'error')
    return
  }

  if (!rentalDetails.value.startDate) {
    showToast('Please select a start date', 'error')
    return
  }

  startLoading()
  try {
    const selectedCustomer = customers.value.find(c => c.id === selectedCustomerId.value)
    
    if (!selectedCustomer) {
      showToast('Customer not found', 'error')
      return
    }

    // Update ONLY the customer and rental fields, preserving all other unit data
    const payload: Partial<StorageUnit> = {
      customer: selectedCustomer.name,
      email: selectedCustomer.email,
      phone: selectedCustomer.phone || '',
      address: selectedCustomer.address || '',
      status: 'occupied',
      paymentStatus: 'paid',
      startDate: rentalDetails.value.startDate,
      nextPayment: rentalDetails.value.nextPayment,
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Use PATCH instead of PUT to only update specified fields
    await axios.patch(`http://localhost:4000/storageUnits/${unit.value.id}`, payload)
    
    // Reload unit data
    const res: AxiosResponse<StorageUnit> = await storageService.getUnitById(unit.value.id.toString())
    unit.value = res.data
    
    showToast(`Customer ${selectedCustomer.name} assigned successfully!`, 'success')
    closeAssignCustomerModal()
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to assign customer.'
    showToast(errorMessage, 'error')
  } finally {
    stopLoading()
  }
}

// Handle Delete Unit
const handleDeleteUnit = async () => {
  if (!unit.value?.id) {
    showToast('Cannot delete unit: Invalid unit ID', 'error')
    return
  }

  const confirmed = confirm(`Are you sure you want to delete unit ${unit.value.unitNumber}? This action cannot be undone.`)
  
  if (!confirmed) {
    return
  }

  startLoading()
  try {
    await storageService.deleteUnit(unit.value.id)
    showToast('Storage unit deleted successfully!', 'success')
    router.push('/storages')
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete storage unit.'
    showToast(errorMessage, 'error')
  } finally {
    stopLoading()
  }
}
</script>

<style scoped>
.unit-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-background);
  color: var(--color-text);
}

.unit-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.back-link:hover {
  color: var(--color-secondary);
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
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.action-btn.secondary:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
}

.action-btn.danger {
  background: var(--color-surface);
  border: 2px solid rgba(239, 68, 68, 0.3);
  color: var(--color-error);
}

.action-btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--color-error);
  color: var(--color-error);
  transform: translateY(-2px);
}

.unit-detail-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.unit-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.unit-title-section {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.unit-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.unit-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.occupied {
  background: var(--color-occupied-bg);
  color: var(--color-occupied);
}

.status-badge.available {
  background: var(--color-available-bg);
  color: var(--color-available);
}

.status-badge.overdue {
  background: var(--color-overdue-bg);
  color: var(--color-overdue);
}

.unit-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-light);
  font-size: 0.9375rem;
}

.spec-item svg {
  color: var(--color-secondary);
}

.customer-section,
.rental-section,
.payment-history-section {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.section-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border-light);
}

.section-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title svg {
  color: var(--color-secondary);
}

.assign-customer-btn {
  padding: 0.625rem 1rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.assign-customer-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.customer-card {
  background: var(--gradient-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.customer-avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.customer-info-main {
  flex: 1;
}

.customer-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.customer-id {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin: 0;
}

.customer-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--color-text-lighter);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.9375rem;
  color: var(--color-text);
  font-weight: 500;
}

.rental-details-card {
  background: var(--gradient-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.rental-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.rental-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rental-label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.rental-value {
  font-size: 1rem;
  color: var(--color-text);
  font-weight: 600;
}

.rental-value.price {
  color: var(--color-secondary);
  font-size: 1.5rem;
}

.payment-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
  text-transform: capitalize;
}

.payment-badge.paid {
  background: var(--color-occupied-bg);
  color: var(--color-occupied);
}

.payment-badge.pending {
  background: var(--color-warning);
  color: var(--color-text);
}

.payment-badge.overdue {
  background: var(--color-overdue-bg);
  color: var(--color-overdue);
}

.payment-badge.available {
  background: var(--color-available-bg);
  color: var(--color-available);
}

.unit-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-title svg {
  color: var(--color-secondary);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.note-item {
  background: var(--color-surface-secondary);
  padding: 1rem;
  border-radius: 10px;
}

.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.note-author {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.875rem;
}

.note-date {
  color: var(--color-text-lighter);
  font-size: 0.75rem;
}

.note-text {
  color: var(--color-text-light);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.add-note-btn {
  width: 100%;
  background: transparent;
  border: 2px dashed var(--color-border);
  color: var(--color-text-light);
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.add-note-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  background: var(--color-hover);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 0.75rem;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
  line-height: 1.5;
}

.activity-content strong {
  color: var(--color-text);
  font-weight: 600;
}

.activity-time {
  color: var(--color-text-lighter);
  font-size: 0.75rem;
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

.modal-container {
  background: var(--color-surface);
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid var(--color-border-light);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0.25rem 0 0;
  font-weight: 500;
}

.modal-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-light);
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: var(--color-hover);
  color: var(--color-text);
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.875rem;
}

.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-light);
  font-style: italic;
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-input-border);
  border-radius: 10px;
  font-size: 0.9375rem;
  color: var(--color-text);
  transition: all 0.2s;
  font-family: inherit;
  background: var(--color-input-bg);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(0, 46, 95, 0.1);
}

.form-input:read-only {
  background: var(--color-hover);
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--color-border-light);
}

.btn-secondary,
.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.btn-secondary:hover {
  border-color: var(--color-border-light);
  background: var(--color-surface-secondary);
}

.btn-primary {
  background: var(--gradient-primary);
  border: 2px solid var(--color-secondary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: pointer;
}

/* Customer List Styles */
.search-box-modal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface-secondary);
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.search-box-modal svg {
  color: var(--color-text-light);
  flex-shrink: 0;
}

.search-input-modal {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.9375rem;
  color: var(--color-text);
}

.search-input-modal::placeholder {
  color: var(--color-text-lighter);
}

.customer-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.customer-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gradient-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.customer-item:hover {
  border-color: var(--color-secondary);
  background: var(--color-hover);
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--color-secondary);
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.customer-details {
  flex: 1;
  min-width: 0;
}

.customer-name-text {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.customer-email {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.empty-customers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-text-light);
}

.empty-customers svg {
  margin-bottom: 1rem;
  color: var(--color-text-disabled);
}

.empty-customers p {
  margin: 0;
  font-size: 0.9375rem;
}

.selected-customer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gradient-surface);
  border: 2px solid var(--color-secondary);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .unit-detail-content {
    grid-template-columns: 1fr;
  }

  .unit-sidebar {
    order: -1;
  }

  .contact-details-grid {
    grid-template-columns: 1fr;
  }

  .section-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .assign-customer-btn {
    width: 100%;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-container {
    max-width: 100%;
    max-height: 95vh;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .customer-avatar-large {
    width: 60px;
    height: 60px;
    font-size: 1.25rem;
  }

  .customer-name-large {
    font-size: 1.5rem;
  }

  .unit-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .search-input,
  .form-input,
  .form-textarea {
    font-size: 0.875rem;
  }

  .unit-specs,
  .rental-grid {
    flex-direction: column;
  }

  .customer-list {
    max-height: 350px;
  }
}

@media (max-width: 768px) {
  .unit-detail-container {
    padding: 1rem;
  }

  .unit-detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .unit-title-section {
    padding: 1.5rem;
  }

  .unit-title {
    font-size: 1.25rem;
  }

  .unit-header-row {
    flex-direction: column;
    text-align: center;
  }

  .unit-specs {
    flex-direction: column;
    align-items: center;
  }

  .customer-avatar-large {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
  }

  .customer-name-large {
    font-size: 1.25rem;
  }

  .customer-details-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1rem;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .search-input {
    font-size: 0.875rem;
  }
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}

.btn-disabled:hover {
  transform: none !important;
  border-color: var(--color-border) !important;
}

.action-btn.danger.btn-disabled:hover {
  background: var(--color-surface) !important;
  color: var(--color-error) !important;
}
</style>