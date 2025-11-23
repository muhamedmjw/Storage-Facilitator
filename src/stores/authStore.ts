import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

// --- HELPER: FALLBACK DEMO USERS ---
// Used when the backend connection fails
const getFallbackUsers = () => {
  const stored = localStorage.getItem('db_users')
  const users = stored ? JSON.parse(stored) : []
  
  const demoUsers = [
    { id: '1', name: 'Admin User', email: 'admin@storage.com', password: 'admin123', role: 'admin' },
    { id: '2', name: 'Member User', email: 'member@storage.com', password: 'member123', role: 'member' }
  ]
  
  return [...demoUsers, ...users]
}

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

  // Actions
  function signup(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        
        // --- VALIDATION (Shared) ---
        if (!name || name.trim().length < 2) {
          resolve({ success: false, message: 'Name must be at least 2 characters' })
          return
        }
        if (!email || !email.includes('@')) {
          resolve({ success: false, message: 'Invalid email address' })
          return
        }
        if (!password || password.length < 6) {
          resolve({ success: false, message: 'Password must be at least 6 characters' })
          return
        }

        // --- ATTEMPT 1: REAL BACKEND ---
        try {
          // Check for existing email on server
          const checkRes = await fetch('http://localhost:4000/users');
          const serverUsers = await checkRes.json();
          
          if (serverUsers.some((u: any) => u.email === email)) {
             resolve({ success: false, message: 'Email already registered' })
             return
          }

          // Save to Server
          await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              password,
              role: 'member'
            })
          })

          // Setup Session
          const newUser = { id: `user-${Date.now()}`, name: name.trim(), email: email.trim(), role: 'member' as const }
          setupSession(newUser)
          resolve({ success: true, message: 'Account created successfully (Server)!' })
          return

        } catch {
          console.warn("Backend failed, switching to LocalStorage mode.");
        }

        // --- ATTEMPT 2: FALLBACK (LocalStorage) ---
        // This runs if the `try` block above fails (e.g. on Vercel)
        try {
          const allUsers = getFallbackUsers()
          
          if (allUsers.some((u: any) => u.email === email)) {
            resolve({ success: false, message: 'Email already registered' })
            return
          }

          const newUser = {
            id: `user-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            password, 
            role: 'member'
          }

          // Save purely to browser storage
          const currentStored = JSON.parse(localStorage.getItem('db_users') || '[]')
          currentStored.push(newUser)
          localStorage.setItem('db_users', JSON.stringify(currentStored))

          // Setup Session
          const { password: _, ...userSafe } = newUser
          setupSession(userSafe as any)
          
          resolve({ success: true, message: 'Account created successfully (Demo Mode)!' })

        } catch  {
          resolve({ success: false, message: 'Unable to save user.' })
        }

      }, 800)
    })
  }

  async function login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    await new Promise(r => setTimeout(r, 500))

    let foundUser = null;

    // --- ATTEMPT 1: REAL BACKEND ---
    try {
      const response = await fetch("http://localhost:4000/users");
      const users = await response.json();
      foundUser = users.find((u: any) => u.email === email && u.password === password);
    } catch {
      console.warn("Backend unreachable, checking LocalStorage.");
    }

    // --- ATTEMPT 2: FALLBACK (If backend failed or user not found there) ---
    if (!foundUser) {
       const localUsers = getFallbackUsers();
       foundUser = localUsers.find((u: any) => u.email === email && u.password === password);
    }

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setupSession({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    })

    return { success: true, message: "Login successful!" };
  }

  // --- HELPER: SESSION SETUP (Used by both) ---
  function setupSession(userData: any) {
     const mockToken = `Bearer-${userData.id}-${Date.now()}`
     const expiry = Date.now() + (2 * 60 * 60 * 1000)

     token.value = mockToken
     tokenExpiry.value = expiry
     user.value = userData

     localStorage.setItem("token", mockToken)
     localStorage.setItem("tokenExpiry", expiry.toString())
     localStorage.setItem("user", JSON.stringify(user.value))

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