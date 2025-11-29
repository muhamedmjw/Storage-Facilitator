<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">
          <Warehouse :size="32" color="white" />
        </div>
        <router-link
          to="/"
          class="logo-text"
        >
          <span class="logo-main">Storage</span>
          <span class="logo-sub">Facility Management System</span>
        </router-link>
      </div>
      <div class="header-actions" v-if="authStore.isAuthenticated">
        <button 
          class="theme-toggle-button" 
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <!-- Sun icon for light mode -->
          <Sun v-if="!isDark" :size="18" />
          <!-- Moon icon for dark mode -->
          <Moon v-else :size="18" />
        </button>
        
        <button class="profile-button">
          <div class="avatar">
            {{ authStore.currentUser?.name?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <span>{{ authStore.currentUser?.name || 'Profile' }}</span>
          <span class="user-role-badge">{{ authStore.userRole }}</span>
        </button>
        
        <button class="logout-button" @click="handleLogout">
          <LogOut :size="18" />
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composables/useToast'
import { Sun, Moon, Warehouse, LogOut } from 'lucide-vue-next'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const { showToast } = useToast()

const isDark = computed(() => themeStore.isDark())

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleLogout = () => {
  authStore.logout()
  showToast('Successfully signed out', 'success')
  router.push('/login')
}
</script>

<style scoped src="../../assets/styles/components/Header.css">

</style>