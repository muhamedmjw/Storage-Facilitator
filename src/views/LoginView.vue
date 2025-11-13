<template>
  <div class="auth-container" :class="{ 'dark-mode': isDark }">
    <!-- Theme Toggle Button -->
    <button 
      class="theme-toggle-floating" 
      @click="toggleTheme"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
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

    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-icon">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#002e5f" />
            <path d="M8 12h16M8 16h16M8 20h16M6 8h20v16H6z" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to Storage Facilitator</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div v-if="errorMessage" class="error-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@storage.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              required
            />
            <button type="button" @click="showPassword = !showPassword" class="toggle-password">
              <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <div v-else class="spinner"></div>
        </button>

        <div class="demo-section">
          <p class="demo-title">Demo Accounts</p>
          <div class="demo-cards">
            <div class="demo-card">
              <strong>Admin</strong>
              <span>admin@storage.com / admin123</span>
            </div>
            <div class="demo-card">
              <strong>Member</strong>
              <span>member@storage.com / member123</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const { showToast } = useToast()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const isDark = computed(() => themeStore.isDark())

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      showToast(result.message, 'success')
      const redirect = route.query.redirect as string || '/'
      router.push(redirect)
    } else {
      errorMessage.value = result.message
    }
  } catch {
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f172a 100%);
  padding: 2rem;
  position: relative;
  transition: background 0.3s ease;
}

/* Dark mode background */
.auth-container.dark-mode {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f172a 100%);
}

.theme-toggle-floating {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.theme-toggle-floating:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.theme-toggle-floating svg {
  transition: transform 0.3s ease;
}

.theme-toggle-floating:active svg {
  transform: scale(0.9);
}

.auth-card {
  background: var(--color-surface);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
}

.auth-header {
  background: linear-gradient(135deg, #1e1e1e 0%, #002e5f 100%);
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.logo-icon {
  margin: 0 auto 1rem;
  width: fit-content;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.auth-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.auth-form {
  padding: 2rem;
}

.error-banner {
  background: rgba(220, 38, 38, 0.1);
  border: 2px solid rgba(220, 38, 38, 0.3);
  color: var(--color-error);
  padding: 0.875rem 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-input-border);
  border-radius: 10px;
  font-size: 1rem;
  color: var(--color-text);
  background: var(--color-input-bg);
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(22, 26, 249, 0.1);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.toggle-password:hover {
  color: var(--color-secondary);
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #1e1e1e 0%, #002e5f 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.demo-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.demo-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-light);
  text-align: center;
  margin: 0 0 1rem;
}

.demo-cards {
  display: grid;
  gap: 0.75rem;
}

.demo-card {
  background: var(--gradient-surface);
  border: 2px solid var(--color-border);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.demo-card:hover {
  border-color: var(--color-secondary);
  transform: translateX(4px);
}

.demo-card strong {
  color: var(--color-text);
}

.demo-card span {
  color: var(--color-text-light);
  font-size: 0.8125rem;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 1rem;
  }

  .theme-toggle-floating {
    top: 1rem;
    right: 1rem;
  }

  .auth-header {
    padding: 2rem 1.5rem;
  }

  .auth-form {
    padding: 1.5rem;
  }
}
</style>