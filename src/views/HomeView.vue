<template>
  <div class="home-container">
    <h1>Dashboard</h1>
    <div class="welcome-message">
      <h2>Welcome back, User</h2>
    </div>
    
    <section class="recent-projects">
      <h3>Recent Projects</h3>
      <div class="project-cards">
        <div class="project-card">
          <h4>Project 1</h4>
          <p>5/12 tasks completed</p>
        </div>
        <div class="project-card">
          <h4>Project 2</h4>
          <p>3/8 tasks completed</p>
        </div>
      </div>
    </section>
    
    <section class="due-tasks">
      <h3>Tasks Due Soon</h3>
      <div class="task-list">
        <div class="task-item">
          <p>Task 1 - Project X - Today</p>
        </div>
        <div class="task-item">
          <p>Task 2 - Project Y - Oct 15</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.welcome-message {
  margin-bottom: 2rem;
}

.recent-projects, .due-tasks {
  margin-bottom: 2rem;
}

.project-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.task-list {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f1f1;
}

.task-item:last-child {
  border-bottom: none;
}
</style>