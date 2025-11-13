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

  // Actions
  function signup(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve) => {
      // Simulated delay (mock backend)
      setTimeout(async () => {
        // Mocked email validation
        const existingEmails = ['admin@storage.com', 'member@storage.com']

        if (existingEmails.includes(email)) {
          resolve({ success: false, message: 'Email already registered' })
          return
        }

        // Input validations
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

        // ------------------------------------
        // SAVE USER INTO db.json (JSON-SERVER)
        // ------------------------------------
        try {
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
        } catch (error) {
          resolve({ success: false, message: 'Unable to save user to database.' })
          return
        }

        // Local mock new user object
        const newUser = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          role: 'member' as const
        }

        // Token
        const mockToken = `Bearer-${newUser.id}-${Date.now()}`
        const expiry = Date.now() + (2 * 60 * 60 * 1000) // 2 hours

        token.value = mockToken
        tokenExpiry.value = expiry
        user.value = newUser

        localStorage.setItem('token', mockToken)
        localStorage.setItem('tokenExpiry', expiry.toString())
        localStorage.setItem('user', JSON.stringify(user.value))

        setupAutoLogout()
        resolve({ success: true, message: 'Account created successfully!' })
      }, 800)
    })
  }

function login(email: string, password: string): Promise<{ success: boolean; message: string }> {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("http://localhost:4000/users");
      const users = await response.json();

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        resolve({ success: false, message: "Invalid email or password" });
        return;
      }

      const mockToken = `Bearer-${foundUser.id}-${Date.now()}`;
      const expiry = Date.now() + (2 * 60 * 60 * 1000);

      token.value = mockToken;
      tokenExpiry.value = expiry;
      user.value = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };

      localStorage.setItem("token", mockToken);
      localStorage.setItem("tokenExpiry", expiry.toString());
      localStorage.setItem("user", JSON.stringify(user.value));

      setupAutoLogout();

      resolve({ success: true, message: "Login successful!" });
    } catch (error) {
      resolve({ success: false, message: "Unable to connect to the server." });
    }
  });
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

  // Initialize auto-logout if valid session exists
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
