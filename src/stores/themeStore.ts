import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('light')

  const savedTheme = localStorage.getItem('storage-theme') as Theme | null
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    currentTheme.value = savedTheme
  }

  applyTheme(currentTheme.value)

  watch(currentTheme, (newTheme) => {
    localStorage.setItem('storage-theme', newTheme)
    applyTheme(newTheme)
  })

  function setTheme(theme: Theme) {
    currentTheme.value = theme
  }

  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  function applyTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }

  const isDark = () => currentTheme.value === 'dark'

  return {
    currentTheme,
    setTheme,
    toggleTheme,
    isDark
  }
})