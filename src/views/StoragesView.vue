<template>
  <div class="units-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">
          Storage Units
        </h1>
        <p class="page-subtitle">
          Manage all storage units and rental assignments
        </p>
      </div>
      <button
        class="add-unit-btn"
        @click="router.push('/add-unit')"
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
            x1="12"
            y1="5"
            x2="12"
            y2="19"
          />
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
          />
        </svg>
        Add Unit
      </button>
    </div>

    <div class="controls-section">
      <div class="search-box">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
          />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search units by number or customer..."
          class="search-input"
        >
      </div>
    </div>

    <div class="units-grid">
      <div
        v-for="(unit, i) in filteredUnits"
        :key="unit?.id ?? i"
        class="unit-card"
        :class="unit?.status || 'available'"
      >
        <div class="unit-card-header">
          <div class="unit-number">
            {{ unit?.unitNumber || `U-${i + 1}` }}
          </div>
          <div
            class="status-indicator"
            :class="unit?.status || 'available'"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
            </svg>
            {{ unit?.status || 'available' }}
          </div>
        </div>

        <div class="unit-card-body">
          <div class="unit-size-info">
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
                y="3"
                width="18"
                height="18"
                rx="2"
              />
            </svg>
            <span class="size-label">{{ unit?.size || 'Unknown size' }}</span>
            <span class="size-badge">{{ unit?.size || 'N/A' }}</span>
          </div>

          <div class="rental-info">
            <div class="info-row">
              <span class="info-label">Monthly Rate:</span>
              <span class="info-value price">
                ${{ unit?.monthlyRate ?? 0 }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">Building:</span>
              <span class="info-value">{{ unit?.building || '—' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Unit:</span>
              <span class="info-value">{{ unit?.unitNumber || '—' }}</span>
            </div>
          </div>
        </div>

        <div class="unit-card-footer">
          <button
            class="action-btn primary"
            @click="router.push(`/storages/${unit?.id ?? i + 1}`)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle
                cx="12"
                cy="12"
                r="3"
              />
            </svg>
            View Details
          </button>
        </div>
      </div>

      <div
        v-if="filteredUnits.length === 0"
        class="empty-state"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
          />
          <line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
          />
          <line
            x1="9"
            y1="21"
            x2="9"
            y2="9"
          />
        </svg>
        <p>No storage units found.</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { storageService, type StorageUnit } from '@/services/storageService'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'

const router = useRouter()
const units = ref<StorageUnit[]>([])
const search = ref('')
const { showToast } = useToast()
const { startLoading, stopLoading } = useLoading()

onMounted(async () => {
  startLoading()
  try {
    const res: AxiosResponse<StorageUnit[]> = await storageService.getUnits()
    if (Array.isArray(res.data)) {
      units.value = res.data
      showToast('Storage units loaded successfully!', 'success')
    } else {
      units.value = []
      showToast('No storage units found.', 'info')
    }

    if (import.meta.env.DEV) {
      console.log('Server returned:', res.data)
    }
  } catch (err: unknown) {
    showToast('Failed to load storage units.', 'error')
    if (import.meta.env.DEV) {
      console.error('Could not load units:', err)
    }
    units.value = []
  } finally {
    stopLoading()
  }
})

const filteredUnits = computed(() => {
  const term = search.value.toLowerCase()
  return units.value.filter(u =>
    (u.unitNumber || '').toLowerCase().includes(term)
  )
})
</script>




<style scoped>
.units-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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
  background: linear-gradient(135deg, #002e5f 0%, #002e5f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #78716c;
  font-size: 1rem;
}

.add-unit-btn {
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
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
  box-shadow: 0 4px 12px rgba(22, 26, 249, 0.3);
}

.add-unit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22, 26, 249, 0.3);
}

.controls-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a8a29e;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e7e5e4;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #002e5f;
  box-shadow: 0 0 0 3px rgba(22, 26, 249, 0.1);
}

.filter-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: white;
  border: 2px solid #e7e5e4;
  color: #78716c;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  border-color: #002e5f;
  color: #002e5f;
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-color: #002e5f;
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.filter-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-tab.active .filter-count {
  background: rgba(255, 255, 255, 0.3);
}

.units-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.unit-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
}

.unit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
}

.unit-card.occupied {
  border-color: #d1fae5;
}

.unit-card.available {
  border-color: #dbeafe;
}

.unit-card.overdue {
  border-color: #ff6e6e;
}

.unit-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
}

.unit-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #292524;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-indicator.occupied {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.status-indicator.available {
  background: rgba(8, 145, 178, 0.1);
  color: #0891b2;
}

.status-indicator.overdue {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
}

.unit-card-body {
  padding: 0 1.5rem 1.5rem;
  flex: 1;
}

.unit-size-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e7e5e4;
}

.unit-size-info svg {
  color: #002e5f;
}

.size-label {
  font-weight: 600;
  color: #292524;
  flex: 1;
}

.size-badge {
  background: rgba(22, 56, 249, 0.1);
  color: #002e5f;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.customer-avatar.warning {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.customer-details {
  flex: 1;
}

.customer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #292524;
  margin: 0 0 0.25rem;
}

.customer-contact {
  font-size: 0.875rem;
  color: #78716c;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.empty-state svg {
  color: #d6d3d1;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #a8a29e;
  font-size: 0.875rem;
  margin: 0;
}

.rental-info {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 0.875rem;
  color: #78716c;
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: #292524;
  font-weight: 600;
}

.info-value.price {
  color: #002e5f;
  font-size: 1.125rem;
}

.overdue-text {
  color: #dc2626 !important;
}

.payment-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.payment-badge.paid {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.payment-badge.overdue {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
}

.unit-card-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e7e5e4;
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
  background: white;
  border: 2px solid #e7e5e4;
  color: #78716c;
}

.action-btn.secondary:hover {
  border-color: #002e5f;
  color: #002e5f;
  transform: translateY(-2px);
}

.action-btn.primary {
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
  border: none;
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 56, 249, 0.4);
}

@media (max-width: 768px) {
  .units-container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .add-unit-btn {
    width: 100%;
    justify-content: center;
  }

  .units-grid {
    grid-template-columns: 1fr;
  }

  .filter-section {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }

  .filter-tab {
    flex-shrink: 0;
  }
}
</style>