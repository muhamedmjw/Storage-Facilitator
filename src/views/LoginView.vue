<template>
  <div class="auth-container" :class="{ 'dark-mode': isDark }">
    <!-- Theme Toggle Button -->
    <ThemeToggle />

    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-icon">
          <Warehouse :size="48" color="white" />
        </div>
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to Storage Facilitator</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div v-if="errorMessage" class="error-banner">
          <CircleX :size="20" color="currentColor" />
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
              <Eye v-if="showPassword" :size="20" />
              <EyeOff v-else :size="20" />
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
              <span>admin@storage.com</span>
              <span>admin123</span>
            </div>
            <div class="demo-card">
              <strong>Member</strong>
              <span>member@storage.com</span>
              <span>member123</span>
            </div>
          </div>
        </div>

        <p class="auth-link">
          Staff members can sign up for an account
          <router-link to="/signup">here</router-link>
        </p>
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
import { Warehouse, CircleX, Eye, EyeOff } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'

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

<style scoped src="../assets/styles/pages/LoginView.css">
</style>