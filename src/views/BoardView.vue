<template>
  <div class="board-container">
    <div class="board-header">
      <div>
        <h1>Project 1</h1>
        <p class="board-subtitle">Kanban board for task management</p>
      </div>
      <button class="add-task-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New Task
      </button>
    </div>
    
    <div class="board-filters">
      <div class="filter-group">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>
        <select class="filter-select">
          <option>All Assignees</option>
          <option>User A</option>
          <option>User B</option>
        </select>
      </div>
    </div>
  
    <div class="kanban-board">
      <div class="board-column">
        <div class="column-header todo">
          <div class="column-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <h3>TO-DO</h3>
            <span class="task-count">2</span>
          </div>
          <button class="column-add-btn">+</button>
        </div>
        <div class="column-tasks">
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 1: Lorem ipsum sit amet.</h4>
            <p class="task-description">Lorem ipsum sit amet.</p>
            <div class="task-footer">
              <div class="task-assignee">
                <div class="avatar">A</div>
                <span>@A</span>
              </div>
              <span class="task-date">Oct 15</span>
            </div>
          </div>
          
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 2: Lorem ipsum dolor sit.</h4>
            <p class="task-description">Lorem ipsum dolor sit</p>
            <div class="task-footer">
              <div class="task-assignee">
                <div class="avatar">B</div>
                <span>@B</span>
              </div>
              <span class="task-date">Oct 18</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="board-column">
        <div class="column-header in-progress">
          <div class="column-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <h3>IN PROGRESS</h3>
            <span class="task-count">1</span>
          </div>
          <button class="column-add-btn">+</button>
        </div>
        <div class="column-tasks">
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 4: Lorem ipsum dolor sit</h4>
            <p class="task-description">Lorem ipsum dolor sit</p>
            <div class="task-footer">
              <div class="task-assignee">
                <div class="avatar">C</div>
                <span>@C</span>
              </div>
              <span class="task-date">Oct 12</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="board-column">
        <div class="column-header done">
          <div class="column-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <h3>DONE</h3>
            <span class="task-count">1</span>
          </div>
          <button class="column-add-btn">+</button>
        </div>
        <div class="column-tasks">
          <div class="task-card completed" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 3: Lorem ipsum dolor sit</h4>
            <p class="task-description">Lorem ipsum dolor sit</p>
            <div class="task-footer">
              <div class="task-assignee">
                <div class="avatar">B</div>
                <span>@B</span>
              </div>
              <span class="task-date">Oct 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const task = { 
  id: '1',
  title: 'Task 1: Task 1'
}
</script>

<style scoped>
.board-container {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.board-header h1 {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.board-subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.add-task-btn {
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

.add-task-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.board-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-group svg {
  color: #667eea;
}

.filter-select {
  border: none;
  background: none;
  color: #1e293b;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

.kanban-board {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  flex: 1;
  padding-bottom: 1rem;
}

.board-column {
  background: white;
  border-radius: 16px;
  min-width: 340px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.column-header {
  padding: 1.25rem;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header.todo {
  background: linear-gradient(135deg, rgba(148, 163, 184, 0.1) 0%, rgba(100, 116, 139, 0.1) 100%);
}

.column-header.in-progress {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
}

.column-header.done {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%);
}

.column-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.column-title svg {
  color: #667eea;
}

.column-title h3 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: 0.5px;
}

.task-count {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.column-add-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.column-add-btn:hover {
  background: rgba(102, 126, 234, 0.2);
}

.column-tasks {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

.task-card {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid #f1f5f9;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.task-card.completed {
  opacity: 0.7;
}

.task-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.label {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.label.ui {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.label.backend {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.label.urgent {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.label.research {
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
}

.label.setup {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.task-card h4 {
  font-size: 1rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.task-description {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-assignee {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
}

.task-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

@media (max-width: 768px) {
  .board-container {
    padding: 1rem;
  }

  .board-header {
    flex-direction: column;
    gap: 1rem;
  }

  .board-filters {
    flex-direction: column;
  }

  .board-column {
    min-width: 280px;
  }
}
</style>