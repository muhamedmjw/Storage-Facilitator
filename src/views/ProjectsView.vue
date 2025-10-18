<template>
  <div class="projects-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">Manage and track all your team projects in one place</p>
      </div>
      <button class="create-project-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Project
      </button>
    </div>

    <div class="controls-section">
      <div class="search-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          class="search-input"
        >
      </div>     
    </div>

    <div class="projects-grid">
      <div class="project-card">
        <div class="project-card-header">
          <div class="project-menu">
          </div>
        </div>

        <div class="project-card-body">
          <h3 class="project-title">Project 1</h3>
          <p class="project-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, numquam! Modi itaque, sunt nulla magni molestias incidunt laborum at ad nobis, earum odio soluta atque.</p>
          
          <div class="project-stats">
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Created Oct 1, 2025</span>
            </div>
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>8/12 tasks</span>
            </div>
          </div>

          <div class="project-members">
            <div class="members-avatars">
              <div class="member-avatar">A</div>
              <div class="member-avatar">B</div>
              <div class="member-avatar">C</div>
            </div>
          </div>
        </div>

        <div class="project-card-footer">
          <button class="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button class="action-btn primary" @click="router.push(`/projects/${project.id}`)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            View Board
          </button>
        </div>
      </div>

      <div class="project-card">
        <div class="project-card-header">
          <div class="project-menu">
          </div>
        </div>

        <div class="project-card-body">
          <h3 class="project-title">Project 2</h3>
          <p class="project-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, numquam! Modi itaque, sunt nulla magni molestias incidunt laborum at ad nobis, earum odio soluta atque.</p>
          
          <div class="project-stats">
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Created Oct 1, 2025</span>
            </div>
            <div class="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>4/10 tasks</span>
            </div>
          </div>

          <div class="project-members">
            <div class="members-avatars">
              <div class="member-avatar">A</div>
              <div class="member-avatar">D</div>
            </div>
          </div>
        </div>

        <div class="project-card-footer">
          <button class="action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button class="action-btn primary" @click="router.push(`/projects/${project.id}`)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            View Board
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const project = { 
  id: '1',
  title: 'Project 1'
}
</script>

<style scoped>
.projects-container {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 1rem;
}

.create-project-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.create-project-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
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
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex; /* Add this */
  flex-direction: column; /* Add this */
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
}

.project-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-menu {
  margin-left: auto;
}

.menu-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: #f1f5f9;
  color: #667eea;
}

.project-card-body {
  padding: 0 1.5rem 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.project-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.project-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.stat-item svg {
  color: #94a3b8;
}

.project-progress {
  margin-bottom: 1.25rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.progress-value {
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.project-members {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.members-avatars {
  display: flex;
  gap: 0.25rem;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  border: 2px solid white;
}

.member-more {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  border: 2px solid white;
}

.members-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.project-card-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem;
  background: white; /* Changed from gradient */
  border-top: none; /* Removed border */
  margin-top: auto; /* Pushes to bottom */
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
  border: 2px solid #e2e8f0;
  color: #64748b;
}

.action-btn.secondary:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .create-project-btn {
    width: 100%;
    justify-content: center;
  }

  .projects-grid {
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