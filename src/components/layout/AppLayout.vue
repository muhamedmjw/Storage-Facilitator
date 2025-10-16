<template>
  <div class="app-container">
    <AppHeader />
    <div class="app-content">
      <AppSidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden; 
}

.app-content {
  display: flex;
  flex: 1;
  overflow: hidden; 
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto; 
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
  }
}
</style>