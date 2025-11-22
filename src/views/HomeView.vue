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
            <p>No overdue payments 🎉</p>
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

<style scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary); /* same gradient as other views */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}


.page-subtitle {
  color: var(--color-text-light);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  line-height: 1;
  transition: color 0.3s ease;
}

.stat-label {
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  transition: color 0.3s ease;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.section-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  transition: color 0.3s ease;
}

.view-all-link {
  color: var(--color-secondary);
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
}

.view-all-link:hover {
  transform: translateX(4px);
}

.unit-cards {
  display: grid;
  gap: 1.5rem;
}

.unit-card {
  background: var(--gradient-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.unit-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-4px);
}

.unit-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.unit-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
}

.unit-badge.occupied {
  background: var(--gradient-primary);
}

.unit-size {
  background: var(--color-hover);
  color: var(--color-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.unit-customer {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.75rem;
  transition: color 0.3s ease;
}

.unit-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.info-item {
  color: var(--color-text-light);
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.overdue-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.overdue-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: var(--gradient-surface);
  border: 2px solid var(--color-border);
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.overdue-item:hover {
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.overdue-content {
  flex: 1;
}

.overdue-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem;
  transition: color 0.3s ease;
}

.overdue-meta {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin: 0;
  transition: color 0.3s ease;
}

.overdue-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-error);
  transition: color 0.3s ease;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-lighter);
  transition: color 0.3s ease;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>