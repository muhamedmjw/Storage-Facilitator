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

    <!-- Toast notifications -->
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', toast.type]"
      >
        {{ toast.message }}
      </div>
    </div>

    <!-- Global loading spinner -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'

const { toasts } = useToast()
const { isLoading } = useLoading()
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

/* Toast styles */
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 9999;
}
.toast {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  animation: fade-in-out 3s ease forwards;
}
.toast.success { background: #16a34a; }
.toast.error { background: #dc2626; }
.toast.info { background: #2563eb; }

@keyframes fade-in-out {
  0%,100% { opacity: 0; transform: translateY(10px); }
  10%,90% { opacity: 1; transform: translateY(0); }
}

/* Spinner overlay */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #ccc;
  border-top-color: #002e5f;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
  }
}
</style>
