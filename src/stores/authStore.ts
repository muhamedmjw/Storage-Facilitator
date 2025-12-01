import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const tokenExpiry = ref<number | null>(Number(localStorage.getItem('tokenExpiry')) || null)

  // Getters
  const isAuthenticated = computed(() => {
    if (!token.value || !tokenExpiry.value) return false
    return Date.now() < tokenExpiry.value
  })

  const currentUser = computed(() => user.value)
  const userRole = computed(() => user.value?.role)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isMember = computed(() => user.value?.role === 'member')

  // SIGNUP – mock server only
  async function signup(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    // Basic validation
    if (!name || name.trim().length < 2) {
      return { success: false, message: 'Name must be at least 2 characters' }
    }
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email address' }
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    // 1) Check existing users
    const checkRes = await fetch('http://localhost:4000/users')
    if (!checkRes.ok) {
      return { success: false, message: 'Cannot reach server' }
    }
    const serverUsers = await checkRes.json()
    if (serverUsers.some((u: any) => u.email === email)) {
      return { success: false, message: 'Email already registered' }
    }

    // 2) Create new user
    const createRes = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
        role: 'member'
      })
    })

    if (!createRes.ok) {
      return { success: false, message: 'Failed to create user' }
    }

    const createdUser = await createRes.json()

    // 3) Setup session (ignore password)
    // Remove password before storing user data
    const { password: _pw, ...safeUser } = createdUser
    setupSession(safeUser)

    return { success: true, message: 'Account created successfully!' }
  }

  // LOGIN – mock server only
  async function login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('http://localhost:4000/users')
    if (!res.ok) {
      return { success: false, message: 'Cannot reach server' }
    }
    const users = await res.json()
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' }
    }

    const { password: _pw, ...safeUser } = foundUser
    setupSession(safeUser)

    return { success: true, message: 'Login successful!' }
  }

  // SESSION
  function setupSession(userData: any) {
    const mockToken = `Bearer-${userData.id}-${Date.now()}`
    const expiry = Date.now() + 2 * 60 * 60 * 1000

    token.value = mockToken
    tokenExpiry.value = expiry
    user.value = userData

    localStorage.setItem('token', mockToken)
    localStorage.setItem('tokenExpiry', expiry.toString())
    localStorage.setItem('user', JSON.stringify(user.value))

    setupAutoLogout()
  }

  function logout() {
    token.value = null
    user.value = null
    tokenExpiry.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tokenExpiry')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
      logoutTimer = null
    }
  }

  function checkTokenExpiry(): boolean {
    if (tokenExpiry.value && Date.now() >= tokenExpiry.value) {
      logout()
      return false
    }
    return true
  }

  let logoutTimer: ReturnType<typeof setTimeout> | null = null

  function setupAutoLogout() {
    if (logoutTimer) clearTimeout(logoutTimer)

    if (tokenExpiry.value) {
      const timeUntilExpiry = tokenExpiry.value - Date.now()
      if (timeUntilExpiry > 0) {
        logoutTimer = setTimeout(() => {
          logout()
        }, timeUntilExpiry)
      }
    }
  }

  if (isAuthenticated.value) {
    setupAutoLogout()
  }

  return {
    token,
    user,
    tokenExpiry,
    isAuthenticated,
    currentUser,
    userRole,
    isAdmin,
    isMember,
    signup,
    login,
    logout,
    checkTokenExpiry
  }
})
