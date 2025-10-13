<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">VueWork</router-link>
    </div>
    <div class="header-actions">
      <button class="profile-button">Profile</button>
      <button class="logout-button">Logout</button>
    </div>
  </header>
</template>

<script setup lang="ts">
// TypeScript component setup
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
  background-color: #4a6baf;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  color: white;
  text-decoration: none;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.header-actions button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header-actions button {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
}
</style>