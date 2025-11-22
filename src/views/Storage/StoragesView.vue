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
          @click="handleAddUnit"
          :disabled="!canAddUnit"
          :title="!canAddUnit ? getDisabledMessage() : 'Add New Unit'"
          :class="{ 'btn-disabled': !canAddUnit }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Storage Unit
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
  import { storageService } from '@/services/storageService'
  import type { StorageUnit } from '@/types'
  import { useToast } from '@/composables/useToast'
  import { useLoading } from '@/composables/useLoading'
  import { usePermissions } from '@/composables/usePermissions'

  const router = useRouter()
  const units = ref<StorageUnit[]>([])
  const search = ref('')
  const { showToast } = useToast()
  const { startLoading, stopLoading } = useLoading()
  const { canAddUnit, getDisabledMessage } = usePermissions()

  onMounted(async () => {
    startLoading()
    try {
      const data = await storageService.getUnits()
      if (Array.isArray(data)) {
        units.value = data
      }
      else {
        units.value = []
        showToast('No storage units found.', 'info')
      }

    } catch {
      showToast('Failed to load storage units.', 'error')
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

  const handleAddUnit = () => {
  if (canAddUnit.value) {
    router.push('/add-unit')
  }
}
</script>


<style scoped src="../../assets/styles/pages/Storage/StorageView.css">

</style>