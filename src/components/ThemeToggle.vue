<template>
  <button 
    class="theme-toggle-floating" 
    @click="toggleTheme"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <Sun v-if="!isDark" :size="20" />
    <Moon v-else :size="20" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { Sun, Moon } from 'lucide-vue-next'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark())

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-toggle-floating {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  padding: 0.75rem;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle-floating:hover {
  transform: scale(1.05);
}
</style>
