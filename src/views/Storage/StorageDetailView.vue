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
import { storageService } from '@/services/storageService'
import type { StorageUnit } from '@/types'
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
  status: 'available' as 'available' | 'occupied' | 'overdue' | 'reserved',
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
    unit.value = await storageService.getUnitById(id)
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
      status: (unit.value.status as 'available' | 'occupied' | 'overdue' | 'reserved') || 'available',
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
    unit.value = await storageService.getUnitById(unit.value.id.toString())
    
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
    unit.value = await storageService.getUnitById(unit.value.id.toString())
    
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

<style scoped src="../../assets/styles/pages/Storage/StorageDetailView.css">

</style>