<template>
  <div class="home-container">
    <div class="page-header">
      <div>
        <h1 class="page-title">Home</h1>
        <p class="page-subtitle">Welcome back! Here's an overview of your projects and tasks.</p>
      </div>
    </div>

    <div class="content-grid">
      <section class="section-card recent-projects">
        <div class="section-header">
          <h2 class="section-title">Recent Projects</h2>
          <router-link to="/projects" class="view-all-link">
            View all →
          </router-link>
        </div>

        <div class="project-cards">
          <div class="project-card">
            <div class="project-card-header">
              <h3 class="project-card-title">Project 1</h3>
              <span class="project-tasks">8/12 tasks</span>            
            </div>     
            <p class="project-card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, at.</p>   
            <div class="project-card-footer">
              <div class="project-members">
                <div class="member-avatar">A</div>
                <div class="member-avatar">B</div>
                <div class="member-avatar">C</div>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-card-header">
              <h3 class="project-card-title">Project 2</h3>
              <span class="project-tasks">4/10 tasks</span>
            </div>
            <p class="project-card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, distinctio.</p>
        
            <div class="project-card-footer">
              <div class="project-members">
                <div class="member-avatar">A</div>
                <div class="member-avatar">D</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-card due-tasks">
        <div class="section-header">
          <h2 class="section-title">Tasks Due Soon</h2>
        </div>
        <div class="task-list">
          <div class="task-item urgent">
            <div class="task-item-content">
              <h4 class="task-item-title">Task 1</h4>
              <p class="task-item-meta">Project 1 • Due today</p>
            </div>
          </div>

          <div class="task-item">
            <div class="task-item-content">
              <h4 class="task-item-title">Task 4</h4>
              <p class="task-item-meta">Project 2 • Due tomorrow</p>
            </div>
          </div>

          <div class="task-item">
            <div class="task-item-content">
              <h4 class="task-item-title">Task 3</h4>
              <p class="task-item-meta">Project 2 • Due in 2 days</p>
            </div>
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
  color: #1e293b;
  margin: 0;
  line-height: 1;
}

.stat-label {
  color: #64748b;
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
  color: #1e293b;
  margin: 0;
}

.view-all-link {
  color: #667eea;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
}

.view-all-link:hover {
  color: #764ba2;
  transform: translateX(4px);
}

.add-task-quick {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.add-task-quick:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.project-cards {
  display: grid;
  gap: 1.5rem;
}

.project-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
}

.project-card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-status.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.project-card-description {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 1rem;
}

.project-card-progress {
  margin-bottom: 1rem;
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
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.project-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.project-members {
  display: flex;
  gap: 0.25rem;
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
  border: 2px solid white;
}

.project-tasks {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.task-item:hover {
  border-color: #667eea;
  transform: translateX(4px);
}



.task-item-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(102, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  flex-shrink: 0;
}

.task-item.urgent .task-item-icon {
  background: rgba(248, 113, 113, 0.1);
  color: #ef4444;
}

.task-item-content {
  flex: 1;
}

.task-item-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem;
}

.task-item-meta {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.task-priority {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.task-priority.high {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.task-priority.medium {
  background: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.task-priority.low {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
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