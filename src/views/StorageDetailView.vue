<template>
  <div class="unit-detail-container">
    <div class="unit-detail-header">
      <router-link to="/storages" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Units
      </router-link>
      <div class="header-actions">
        <button class="action-btn secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Unit
        </button>
      </div>
    </div>

    <div class="unit-detail-content">
      <div class="unit-main">
        <div class="unit-title-section">
          <div class="unit-header-row">
            <h1 class="unit-title">Unit A-1</h1>
            <div class="status-badge occupied">Occupied</div>
          </div>
          <div class="unit-specs">
            <div class="spec-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
              </svg>
              <span>30x30 meters</span>
            </div>
            <div class="spec-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M2 12h20"/>
              </svg>
              <span>Unit 1  |  Building A</span>
            </div>
          </div>
        </div>

        <div class="customer-section">
          <div class="section-header">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Customer Information
            </h3>
          </div>
          <div class="customer-card">
            <div class="customer-header">
              <div class="customer-avatar-large">TU</div>
              <div class="customer-info-main">
                <h4 class="customer-name">Test User</h4>
                <p class="customer-id">Customer ID: #TU-291004</p>
              </div>
            </div>
            <div class="customer-details-grid">
              <div class="detail-item">
                <span class="detail-label">Email</span>
                <span class="detail-value">test.user@gmail.com</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone</span>
                <span class="detail-value">(+964) 123 456 7890</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Address</span>
                <span class="detail-value">X Y, Z</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Customer Since</span>
                <span class="detail-value">July 28, 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rental-section">
          <div class="section-header">
            <h3 class="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Rental Details
            </h3>
          </div>
          <div class="rental-details-card">
            <div class="rental-grid">
              <div class="rental-item">
                <span class="rental-label">Start Date</span>
                <span class="rental-value">October 15, 2025</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Monthly Rate</span>
                <span class="rental-value price">$150.00</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Next Payment Due</span>
                <span class="rental-value">November 15, 2025</span>
              </div>
              <div class="rental-item">
                <span class="rental-label">Payment Status</span>
                <span class="payment-badge paid">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="unit-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Notes
          </h3>
          <div class="notes-list">
            <div class="note-item">
              <div class="note-header">
                <span class="note-author">User 1</span>
                <span class="note-date">Oct 15, 2025</span>
              </div>
              <p class="note-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem unde ex eligendi incidunt assumenda tenetur, ullam autem iste veniam id!</p>
            </div>
            <div class="note-item">
              <div class="note-header">
                <span class="note-author">User 2</span>
                <span class="note-date">Oct 14, 2025</span>
              </div>
              <p class="note-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus repellat molestias harum id!</p>
            </div>
          </div>
          <button class="add-note-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Note
          </button>
        </div>

        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Activity Log
          </h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-content">
                <p><strong>Payment received</strong> - $150.00</p>
                <span class="activity-time">Oct 15, 2025 at 10:30 AM</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-content">
                <p><strong>Unit assigned</strong> to User 2</p>
                <span class="activity-time">Oct 15, 2025 at 9:00 AM</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-content">
                <p><strong>Unit details</strong> updated</p>
                <span class="activity-time">Oct 14, 2025 at 3:45 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.unit-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
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
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  color: #292524;
  margin: 0;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.occupied {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
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
  color: #78716c;
  font-size: 0.9375rem;
}

.spec-item svg {
  color: #002e5f;
}

.customer-section,
.rental-section,
.payment-history-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

.customer-card {
  background: linear-gradient(180deg, #fafaf9 0%, #ffffff 100%);
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 1.5rem;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e7e5e4;
}

.customer-avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1E1E1E 0%, #002e5f 100%);
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
  color: #292524;
  margin: 0 0 0.25rem;
}

.customer-id {
  color: #78716c;
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
  color: #a8a29e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.9375rem;
  color: #292524;
  font-weight: 500;
}

.rental-details-card {
  background: linear-gradient(180deg, #fafaf9 0%, #ffffff 100%);
  border: 1px solid #e7e5e4;
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
  color: #78716c;
  font-weight: 500;
}

.rental-value {
  font-size: 1rem;
  color: #292524;
  font-weight: 600;
}

.rental-value.price {
  color: #002e5f;
  font-size: 1.5rem;
}

.payment-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
}

.payment-badge.paid {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.payment-history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(180deg, #fafaf9 0%, #ffffff 100%);
  border: 1px solid #e7e5e4;
  border-radius: 10px;
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.payment-date {
  font-weight: 600;
  color: #292524;
  font-size: 0.9375rem;
}

.payment-method {
  color: #78716c;
  font-size: 0.875rem;
}

.payment-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #16a34a;
}

.unit-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.note-item {
  background: #fafaf9;
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
  color: #292524;
  font-size: 0.875rem;
}

.note-date {
  color: #a8a29e;
  font-size: 0.75rem;
}

.note-text {
  color: #57534e;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.add-note-btn {
  width: 100%;
  background: transparent;
  border: 2px dashed #e7e5e4;
  color: #6c6c78;
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
  border-color: #002e5f;
  color: #002e5f;
  background: rgba(37, 22, 249, 0.05);
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

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.paid {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.activity-icon.info {
  background: rgba(8, 145, 178, 0.1);
  color: #0891b2;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  color: #57534e;
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
  line-height: 1.5;
}

.activity-content strong {
  color: #292524;
  font-weight: 600;
}

.activity-time {
  color: #a8a29e;
  font-size: 0.75rem;
}

@media (max-width: 1024px) {
  .unit-detail-content {
    grid-template-columns: 1fr;
  }

  .unit-sidebar {
    order: -1;
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

  .unit-title-section {
    padding: 1.5rem;
  }

  .unit-title {
    font-size: 1.5rem;
  }

  .customer-details-grid,
  .rental-grid {
    grid-template-columns: 1fr;
  }
}
</style>