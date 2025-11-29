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
          <Plus class="icon" />
          Add Storage Unit
      </button>
    </div>

    <div class="controls-section">
      <div class="search-box">
        <Search class="icon" />
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
            {{ unit?.status || 'available' }}
          </div>
        </div>

        <div class="unit-card-body">
          <div class="unit-size-info">
            <Square class="icon" />
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
            <Eye class="icon" />
            View Details
          </button>
        </div>
      </div>

      <div
        v-if="filteredUnits.length === 0"
        class="empty-state"
      >
        <SquareDashed
          class="icon-large"
          :size="80"
        />
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
  import { Plus, Search, Square, Eye, SquareDashed } from 'lucide-vue-next'

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