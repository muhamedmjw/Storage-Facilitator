<template>
  <div class="home-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">
          Home
        </h1>
        <p class="page-subtitle">
          Welcome back! Here's an overview of your storage facility.
        </p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-content">
          <h2 class="stat-value">
            {{ totalUnits }}
          </h2>
          <p class="stat-label">
            Total Units
          </p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <h2 class="stat-value">
            {{ availableUnits }}
          </h2>
          <p class="stat-label">
            Available
          </p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <h2 class="stat-value">
            {{ occupiedUnits }}
          </h2>
          <p class="stat-label">
            Occupied
          </p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <h2 class="stat-value">
            {{ overdueUnits }}
          </h2>
          <p class="stat-label">
            Overdue
          </p>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <section class="section-card recent-units">
        <div class="section-header">
          <h2 class="section-title">
            Recent Rentals
          </h2>
          <router-link
            to="/storages"
            class="view-all-link"
          >
            View all →
          </router-link>
        </div>

        <div class="unit-cards">
          <div
            v-for="(unit, i) in recentUnits"
            :key="unit?.id ?? i"
            class="unit-card"
          >
            <div class="unit-card-header">
              <div class="unit-badge occupied">
                Unit #{{ unit?.unitNumber || `U-${i + 1}` }}
              </div>
              <span class="unit-size">{{ unit?.size || 'Unknown' }}</span>
            </div>
            <p class="unit-customer">
              {{ unit?.customer || 'No Customer' }}
            </p>
            <div class="unit-info">
              <span class="info-item">${{ unit?.monthlyRate ?? 0 }}/month</span>
              <span class="info-item">
                {{ unit?.status || 'available' }}
              </span>
            </div>
          </div>

          <div
            v-if="recentUnits.length === 0"
            class="empty-state"
          >
            <p>No recent rentals found.</p>
          </div>
        </div>
      </section>

      <section class="section-card overdue-section">
        <div class="section-header">
          <h2 class="section-title">
            Overdue Payments
          </h2>
        </div>
        <div class="overdue-list">
          <div
            v-for="(unit, i) in overdueList"
            :key="unit?.id ?? i"
            class="overdue-item"
          >
            <div class="overdue-content">
              <h4 class="overdue-title">
                Unit #{{ unit?.unitNumber || `U-${i + 1}` }} - {{ unit?.customer || 'Unknown' }}
              </h4>
              <p class="overdue-meta">
                ${{ unit?.monthlyRate ?? 0 }}/month • Overdue
              </p>
            </div>
            <div class="overdue-amount">
              ${{ unit?.monthlyRate ?? 0 }}
            </div>
          </div>

          <div
            v-if="overdueList.length === 0"
            class="empty-state"
          >
            <p>No overdue payments</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { storageService } from '@/services/storageService'
  import type { StorageUnit } from '@/types'
  import { useToast } from '@/composables/useToast'
  import { useLoading } from '@/composables/useLoading'

  const units = ref<StorageUnit[]>([])
  const _error = ref<string | null>(null)
  const { showToast } = useToast()
  const { startLoading, stopLoading } = useLoading()

  onMounted(async () => {
    startLoading()
    try {
      const data = await storageService.getUnits()
      units.value = Array.isArray(data) ? data : []
      showToast('Home page loaded successfully!', 'success')

    } catch (err: unknown) {
      _error.value = err instanceof Error ? err.message : 'Failed to fetch units.'
      showToast('Failed to load storage units.', 'error')

    } finally {
      stopLoading()
    }
  })

  const totalUnits = computed(() => units.value.length)
  const availableUnits = computed(() =>
    units.value.filter(u => (u.status || '').toLowerCase() === 'available').length
  )
  const occupiedUnits = computed(() =>
    units.value.filter(u => (u.status || '').toLowerCase() === 'occupied').length
  )
  const overdueUnits = computed(() =>
    units.value.filter(u => (u.status || '').toLowerCase() === 'overdue').length
  )

  const recentUnits = computed(() => units.value.slice(-3).reverse())
  const overdueList = computed(() =>
    units.value.filter(u => (u.status || '').toLowerCase() === 'overdue')
  )
</script>

<style scoped src="../assets/styles/pages/HomeView.css">
</style>