<template>
  <div class="home-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Home</h1>
        <p class="page-subtitle">Welcome back! Here's an overview of your storage facility.</p>
      </div>
    </div>

    <div class="content-grid">
      <section class="section-card recent-units">
        <div class="section-header">
          <h2 class="section-title">Recent Rentals</h2>
          <router-link to="/storages" class="view-all-link">
            View all →
          </router-link>
        </div>

        <div class="unit-cards">
          <div class="unit-card">
            <div class="unit-card-header">
              <div class="unit-badge occupied">Unit #A-1</div>
              <span class="unit-size">10x10</span>
            </div>
            <p class="unit-customer">AAA BBB</p>
            <div class="unit-info">
              <span class="info-item">$150/month</span>
              <span class="info-item">Rented: Oct 15, 2025</span>
            </div>
            <div class="unit-status">
              <span class="status-badge paid">Paid</span>
              <span class="next-payment">Next: Nov 15</span>
            </div>
          </div>

          <div class="unit-card">
            <div class="unit-card-header">
              <div class="unit-badge occupied">Unit #B-2</div>
              <span class="unit-size">5x10</span>
            </div>
            <p class="unit-customer">CCC DDD</p>
            <div class="unit-info">
              <span class="info-item">$95/month</span>
              <span class="info-item">Rented: Oct 12, 2025</span>
            </div>
            <div class="unit-status">
              <span class="status-badge paid">Paid</span>
              <span class="next-payment">Next: Nov 12</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-card overdue-section">
        <div class="section-header">
          <h2 class="section-title">Overdue Payments</h2>
        </div>
        <div class="overdue-list">
          <div class="overdue-item urgent">
            <div class="overdue-content">
              <h4 class="overdue-title">Unit #C-30 - Test User</h4>
              <p class="overdue-meta">$180/month • 15 days overdue</p>
            </div>
            <div class="overdue-amount">$180</div>
          </div>

          <div class="overdue-item">
            <div class="overdue-content">
              <h4 class="overdue-title">Unit #A-12 - Test User</h4>
              <p class="overdue-meta">$150/month • 7 days overdue</p>
            </div>
            <div class="overdue-amount">$150</div>
          </div>

          <div class="overdue-item">
            <div class="overdue-content">
              <h4 class="overdue-title">Unit #D-27 - Test User</h4>
              <p class="overdue-meta">$210/month • 3 days overdue</p>
            </div>
            <div class="overdue-amount">$210</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #292524;
  margin: 0;
  line-height: 1;
}

.stat-label {
  color: #78716c;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  color: #292524;
  margin: 0;
}

.view-all-link {
  color: #002e5f;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
}

.view-all-link:hover {
  color: #002e5f;
  transform: translateX(4px);
}

.unit-cards {
  display: grid;
  gap: 1.5rem;
}

.unit-card {
  background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.unit-card:hover {
  border-color: #002e5f;
  box-shadow: 0 8px 16px rgba(0, 6, 90, 0.15);
  transform: translateY(-2px);
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
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
}

.unit-size {
  background: rgba(0, 14, 95, 0.1);
  color: #002e5f;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.unit-customer {
  font-size: 1rem;
  font-weight: 600;
  color: #292524;
  margin: 0 0 0.75rem;
}

.unit-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.info-item {
  color: #78716c;
  font-size: 0.875rem;
}

.unit-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e7e5e4;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.paid {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.next-payment {
  font-size: 0.75rem;
  color: #78716c;
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
  background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
  border: 2px solid #e7e5e4;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.overdue-item:hover {
  border-color: #002e5f;
  transform: translateX(4px);
}

.overdue-content {
  flex: 1;
}

.overdue-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #292524;
  margin: 0 0 0.25rem;
}

.overdue-meta {
  font-size: 0.75rem;
  color: #78716c;
  margin: 0;
}

.overdue-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #dc2626;
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

  .stat-icon {
    width: 48px;
    height: 48px;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>