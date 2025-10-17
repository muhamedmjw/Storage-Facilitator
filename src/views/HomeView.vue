<template>
  <div class="home-container">
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="page-subtitle">Welcome back, User! Here's what's happening today.</p>
      </div>
      <button class="action-button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Quick Add
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Active Tasks</p>
          <h3 class="stat-value">12</h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">In Progress</p>
          <h3 class="stat-value">8</h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Completed</p>
          <h3 class="stat-value">24</h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="stat-content">
          <p class="stat-label">Due Soon</p>
          <h3 class="stat-value">3</h3>
        </div>
      </div>
    </div>
    
    <section class="recent-projects">
      <div class="section-header">
        <h3>Recent Projects</h3>
        <a href="/projects" class="view-all">View All →</a>
      </div>
      <div class="project-cards">
        <div class="project-card">
          <div class="project-header">
            <h4>Project Alpha</h4>
            <span class="project-badge active">Active</span>
          </div>
          <p class="project-description">Main development project for Q4</p>
          <div class="project-progress">
            <div class="progress-info">
              <span>5/12 tasks completed</span>
              <span>42%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 42%"></div>
            </div>
          </div>
          <div class="project-footer">
            <div class="project-members">
              <div class="member-avatar">A</div>
              <div class="member-avatar">B</div>
              <div class="member-avatar">C</div>
            </div>
            <span class="project-date">Due Oct 30</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-header">
            <h4>Project Beta</h4>
            <span class="project-badge active">Active</span>
          </div>
          <p class="project-description">Marketing campaign redesign</p>
          <div class="project-progress">
            <div class="progress-info">
              <span>8/10 tasks completed</span>
              <span>80%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 80%"></div>
            </div>
          </div>
          <div class="project-footer">
            <div class="project-members">
              <div class="member-avatar">D</div>
              <div class="member-avatar">E</div>
            </div>
            <span class="project-date">Due Nov 15</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="due-tasks">
      <div class="section-header">
        <h3>Tasks Due Soon</h3>
        <a href="#" class="view-all">View All →</a>
      </div>
      <div class="task-list">
        <div class="task-item">
          <div class="task-checkbox">
            <input type="checkbox">
          </div>
          <div class="task-info">
            <p class="task-title">Complete API documentation</p>
            <p class="task-meta">Project Alpha • Due Today</p>
          </div>
          <span class="task-priority high">High</span>
        </div>
        
        <div class="task-item">
          <div class="task-checkbox">
            <input type="checkbox">
          </div>
          <div class="task-info">
            <p class="task-title">Review design mockups</p>
            <p class="task-meta">Project Beta • Due Tomorrow</p>
          </div>
          <span class="task-priority medium">Medium</span>
        </div>

        <div class="task-item">
          <div class="task-checkbox">
            <input type="checkbox">
          </div>
          <div class="task-info">
            <p class="task-title">Update dependencies</p>
            <p class="task-meta">Project Alpha • Due in 2 days</p>
          </div>
          <span class="task-priority low">Low</span>
        </div>
      </div>
    </section>
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.action-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.2s;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.purple {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
}

.stat-icon.blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
  color: #3b82f6;
}

.stat-icon.green {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%);
  color: #22c55e;
}

.stat-icon.orange {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%);
  color: #fb923c;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.recent-projects, .due-tasks {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0;
}

.view-all {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.view-all:hover {
  color: #764ba2;
  transform: translateX(4px);
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.project-header h4 {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0;
}

.project-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.project-description {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.project-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-members {
  display: flex;
  gap: -0.5rem;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  margin-left: -8px;
  border: 2px solid white;
}

.member-avatar:first-child {
  margin-left: 0;
}

.project-date {
  color: #64748b;
  font-size: 0.875rem;
}

.task-list {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.task-item {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.2s;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item:hover {
  background: #f8fafc;
}

.task-checkbox input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-info {
  flex: 1;
}

.task-title {
  color: #1e293b;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.task-meta {
  color: #64748b;
  font-size: 0.875rem;
}

.task-priority {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.task-priority.high {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.task-priority.medium {
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
}

.task-priority.low {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .project-cards {
    grid-template-columns: 1fr;
  }
}
</style>