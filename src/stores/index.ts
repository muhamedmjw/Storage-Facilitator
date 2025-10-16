import { defineStore } from 'pinia'
import { User } from '@/types'

interface AppState {
  isLoading: boolean;
  theme: 'light' | 'dark';
  currentUser: User | null;
}


export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isLoading: false,
    theme: 'light',
    currentUser: null
  }),
  actions: {
    setLoading(status: boolean): void {
      this.isLoading = status
    },
    toggleTheme(): void {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    setCurrentUser(user: User | null): void {
      this.currentUser = user
    }
  },
  getters: {
    isDarkTheme: (state): boolean => state.theme === 'dark',
    isLoggedIn: (state): boolean => state.currentUser !== null,
    isAdmin: (state): boolean => state.currentUser?.role === 'admin'
  }
})