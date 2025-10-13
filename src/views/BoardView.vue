<template>
  <div class="board-container">
    <div class="board-header">
      <h1>Project Alpha</h1>
      <button class="add-task-btn">+ New Task</button>
    </div>
    
    <div class="board-filters">
      <div class="filter-dropdown">
        <span>Filter by: </span>
        <select>
          <option>All Assignees</option>
          <option>User 1</option>
          <option>User 2</option>
        </select>
      </div>
      
      <div class="filter-dropdown">
        <span>Labels: </span>
        <select>
          <option>All Labels</option>
          <option>UI</option>
          <option>Backend</option>
          <option>Urgent</option>
        </select>
      </div>
    </div>
    
    <div class="kanban-board">
      <div class="board-column">
        <div class="column-header">
          <h3>TO-DO</h3>
        </div>
        <div class="column-tasks">
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 1: UI Design</h4>
            <p class="task-assignee">@User1</p>
            <p class="task-due-date">Oct 15</p>
          </div>
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 2: Research</h4>
            <p class="task-assignee">@User1</p>
            <p class="task-due-date">Oct 18</p>
          </div>
        </div>
      </div>
      
      <div class="board-column">
        <div class="column-header">
          <h3>IN PROGRESS</h3>
        </div>
        <div class="column-tasks">
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 4: API Development</h4>
            <p class="task-assignee">@User2</p>
            <p class="task-due-date">Oct 12</p>
          </div>
        </div>
      </div>
      
      <div class="board-column">
        <div class="column-header">
          <h3>DONE</h3>
        </div>
        <div class="column-tasks">
          <div class="task-card" @click="router.push(`/tasks/${task.id}`)">
            <h4>Task 7: Setup</h4>
            <p class="task-assignee">@User3</p>
            <p class="task-due-date">Oct 5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// Temporary test data
const task = { 
  id: '42',
  title: 'Task 1: UI Design'
}
</script>

<style scoped>
.board-container {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.board-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.filter-dropdown select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
}

.kanban-board {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.board-column {
  background-color: #f8fafc;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 300px;
  flex: 1;
}

.column-header {
  padding: 1rem;
  background-color: #e2e8f0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.column-tasks {
  padding: 1rem;
  min-height: 200px;
}

.task-card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  cursor: pointer;
}

.task-assignee, .task-due-date {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}
</style>