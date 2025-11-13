<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect
              width="32"
              height="32"
              rx="8"
              fill="white"
              fill-opacity="0.2"
            />
            <path
              d="M8 12h16M8 16h16M8 20h16M6 8h20v16H6z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
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
          <svg
            v-if="!isDark"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <!-- Moon icon for dark mode -->
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        
        <button class="profile-button">
          <div class="avatar">
            {{ authStore.currentUser?.name?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <span>{{ authStore.currentUser?.name || 'Profile' }}</span>
          <span class="user-role-badge">{{ authStore.userRole }}</span>
        </button>
        
        <button class="logout-button" @click="handleLogout">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
            />
          </svg>
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

<style scoped>
.app-header {
  background: var(--gradient-header);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 70px;
  max-width: 1920px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: none;
  line-height: 1.2;
}

.logo-main {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.75rem;
  opacity: 0.9;
  font-weight: 400;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  gap: 0.5rem;
}

.theme-toggle-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.theme-toggle-button svg {
  transition: transform 0.3s ease;
}

.theme-toggle-button:active svg {
  transform: scale(0.9);
}

.profile-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.user-role-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 600;
}

.logout-button {
  background: rgba(243, 43, 43, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(236, 42, 42, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.logout-button:hover {
  background: rgba(220, 38, 38, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .logo-sub {
    display: none;
  }
  
  .profile-button span,
  .user-role-badge {
    display: none;
  }
  
  .logout-button span {
    display: none;
  }
  
  .profile-button {
    width: 40px;
    padding: 0.5rem;
    justify-content: center;
  }
  
  .logout-button {
    width: 40px;
    padding: 0.5rem;
    justify-content: center;
  }
  
  .theme-toggle-button {
    width: 40px;
    height: 40px;
    padding: 0.5rem;
  }

  .avatar {
    width: 24px;
    height: 24px;
  }
}
</style>