<template>
  <div class="auth-container" :class="{ 'dark-mode': isDark }">
    <!-- Theme Toggle Button -->
    <ThemeToggle />

    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-icon">
          <Warehouse :size="48" color="white" />
        </div>

        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join Storage Facilitator</p>
      </div>

      <form @submit.prevent="handleSignUp" class="auth-form">
        <div v-if="errorMessage" class="error-banner">
          <CircleX :size="20" color="currentColor" />
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder=""
            required
            minlength="2"
          />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="At least 6 characters"
              required
              minlength="6"
            />

            <button type="button" @click="showPassword = !showPassword" class="toggle-password">
              <Eye v-if="showPassword" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>

          <p class="form-hint">Must be at least 6 characters</p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>

          <div class="password-wrapper">
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Re-enter your password"
              required
            />

            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="toggle-password">
              <Eye v-if="showConfirmPassword" :size="20" />
              <EyeOff v-else :size="20" />
            </button>
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="!loading">Create Account</span>
          <div v-else class="spinner"></div>
        </button>

        <p class="auth-link">
          Have an account?
          <router-link to="/login"> Log in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { useToast } from '@/composables/useToast'
import { Eye, EyeOff, Warehouse, CircleX } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const { showToast } = useToast()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const isDark = computed(() => themeStore.isDark())


const handleSignUp = async () => {
  errorMessage.value = ''

  if (formData.value.name.trim().length < 2) {
    errorMessage.value = 'Name must be at least 2 characters'
    return
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true

  try {
    const result = await authStore.signup(
      formData.value.name.trim(),
      formData.value.email.trim(),
      formData.value.password
    )

    if (result.success) {
      showToast(result.message, 'success')
      router.push('/')
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

<style scoped src="../assets/styles/pages/SignupView.css">

</style>