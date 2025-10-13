<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// For testing, you can add this temporary project data
const project = {
  id: '123',  // This would normally come from your data store
  title: 'Project Alpha'
}
</script>


<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1>Projects</h1>
      <button class="create-project-btn">+ New Project</button>
    </div>
    
    <div class="search-bar">
      <input type="text" placeholder="Search projects..." />
    </div>
    
    <div class="filter-tabs">
      <button class="filter-tab active">All</button>
      <button class="filter-tab">Active</button>
      <button class="filter-tab">Archived</button>
    </div>
    
    <div class="project-list">
      <div class="project-item">
        <h3>Project Alpha</h3>
        <p>Created: Oct 1, 2025</p>
        <p>Tasks: 8/12 complete</p>
        <p>Members: User1, User2, User3</p>
        <div class="project-actions">
          <button class="btn-view" @click="router.push(`/projects/${project.id}`)">View Board</button>
          <button class="btn-edit">Edit</button>
        </div>
      </div>
      
      <div class="project-item">
        <h3>Project Beta</h3>
        <p>Created: Sep 15, 2025</p>
        <p>Tasks: 4/10 complete</p>
        <p>Members: User1, User4</p>
        <div class="project-actions">
          <button class="btn-view" @click="router.push(`/projects/${project.id}`)">View Board</button>
          <button class="btn-edit">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.create-project-btn {
  background-color: var(--color-primary);
  color: white;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-tab {
  background: none;
  border: 1px solid #e2e8f0;
  color: var(--color-secondary);
}

.filter-tab.active {
  background-color: var(--color-primary);
  color: white;
}

.project-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.project-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>