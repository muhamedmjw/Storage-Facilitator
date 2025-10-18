<template>
  <div class="task-detail-container">
    <div class="task-detail-header">
      <router-link to="/projects/1" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Project 1
      </router-link>
      <div class="header-actions">
        <button class="action-btn secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>

    <div class="task-detail-content">
      <div class="task-main">
        <div class="task-title-section">
          <div class="task-id-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Task #1
          </div>
          <h1 class="task-title">Task 1</h1>
        </div>

        <div class="task-description-section">
          <div class="section-header">
            <h3 class="section-title">Description</h3>
            <button class="edit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit
            </button>
          </div>
          <div class="description-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam hic tempore consequatur, aliquam beatae sint maiores minima inventore facilis quis, nobis nostrum architecto, iure voluptatum.</p>
            <p>Requirements:</p>
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
              <li>Four</li>
              <li>Five</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="task-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">Properties</h3>
          
          <div class="property-item">
            <label class="property-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              Status
            </label>
            <select class="property-select">
              <option>To-Do</option>
              <option selected>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div class="property-item">
            <label class="property-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Assignee
            </label>
            <select class="property-select">
              <option>Unassigned</option>
              <option selected>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          <div class="property-item">
            <label class="property-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Due Date
            </label>
            <input type="date" class="property-input" value="2025-10-20">
          </div>
        </div>

        <!-- <div class="sidebar-card">
          <h3 class="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            Labels
          </h3>
          
          <div class="labels-list">
            <span class="label-tag ui">
              UI
              <button class="remove-label">×</button>
            </span>
            <span class="label-tag urgent">
              High Priority
              <button class="remove-label">×</button>
            </span>
            <span class="label-tag frontend">
              Frontend
              <button class="remove-label">×</button>
            </span>
          </div>

          <button class="add-label-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Label
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.task-detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.task-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.back-link:hover {
  color: #764ba2;
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
  border: 2px solid #fee2e2;
  color: #ef4444;
}

.action-btn.secondary:hover {
  background: #fef2f2;
  border-color: #fecaca;
  transform: translateY(-2px);
}

.task-detail-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.task-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.task-title-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.task-id-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.task-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.task-description-section,
.task-comments-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comment-count {
  background: #f1f5f9;
  color: #64748b;
  padding: 0.25rem 0.625rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.edit-btn {
  background: transparent;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.edit-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.description-content {
  color: #475569;
  line-height: 1.7;
  font-size: 0.9375rem;
}

.description-content p {
  margin-bottom: 1rem;
}

.description-content ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.description-content li {
  margin-bottom: 0.5rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9375rem;
}

.comment-time {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.comment-text {
  color: #475569;
  line-height: 1.6;
  margin: 0;
  font-size: 0.9375rem;
}

.new-comment {
  display: flex;
  gap: 1rem;
}

.new-comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.new-comment-input {
  flex: 1;
}

.new-comment-input textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9375rem;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.new-comment-input textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.attach-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.attach-btn:hover {
  color: #667eea;
  background: #f1f5f9;
}

.submit-comment-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.submit-comment-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.task-sidebar {
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
  color: #1e293b;
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.property-item {
  margin-bottom: 1.25rem;
}

.property-item:last-child {
  margin-bottom: 0;
}

.property-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.property-select,
.property-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.property-select:hover,
.property-input:hover {
  border-color: #cbd5e1;
}

.property-select:focus,
.property-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.labels-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.label-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.label-tag.ui {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.label-tag.urgent {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.label-tag.frontend {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.remove-label {
  background: transparent;
  border: none;
  color: currentColor;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.remove-label:hover {
  opacity: 1;
}

.add-label-btn {
  width: 100%;
  background: transparent;
  border: 2px dashed #e2e8f0;
  color: #64748b;
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

.add-label-btn:hover {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
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

.activity-icon.created {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.activity-icon.updated {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.activity-icon.commented {
  background: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  color: #475569;
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
  line-height: 1.5;
}

.activity-content strong {
  color: #1e293b;
  font-weight: 600;
}

.activity-time {
  color: #94a3b8;
  font-size: 0.75rem;
}

.status-badge {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.75rem;
}

@media (max-width: 1024px) {
  .task-detail-content {
    grid-template-columns: 1fr;
  }

  .task-sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .task-detail-container {
    padding: 1rem;
  }

  .task-detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .task-title-section {
    padding: 1.5rem;
  }

  .task-title {
    font-size: 1.5rem;
  }

  .task-description-section,
  .task-comments-section {
    padding: 1.5rem;
  }

  .new-comment {
    flex-direction: column;
  }

  .new-comment-avatar {
    display: none;
  }
}
</style>