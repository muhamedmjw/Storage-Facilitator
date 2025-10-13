<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <nav>
      <ul class="nav-links">
        <li>
          <router-link to="/">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/projects">Projects</router-link>
        </li>
        <li>
          <router-link to="/calendar">Calendar</router-link>
        </li>
        <li>
          <router-link to="/analytics">Analytics</router-link>
        </li>
      </ul>
    </nav>
    <button class="collapse-button" @click="toggleCollapse">
      {{ isCollapsed ? '→' : '←' }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref<boolean>(false)

function toggleCollapse(): void {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #f5f7fa;
  border-right: 1px solid #e2e8f0;
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
}

.sidebar-collapsed {
  width: 60px;
}

.nav-links {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
}

.nav-links li {
  padding: 0.5rem 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #334155;
  font-weight: 500;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: #e2e8f0;
}

.collapse-button {
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .nav-links {
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
  }
  
  .nav-links li {
    padding: 0;
  }
  
  .collapse-button {
    display: none;
  }
}
</style>