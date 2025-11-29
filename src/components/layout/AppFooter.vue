<template>
  <footer class="app-footer" :class="{ 'dark-mode': isDark }">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-logo">
          <span class="footer-text">Storage</span>
        </div>
        <p class="copyright">
          © 2025 Storage - All rights reserved
        </p>
      </div>
      <div class="footer-right">
        <span class="version-badge">v4.0.0</span>
        <div class="social-links">
          <a
            href="https://github.com/muhamedmjw/Web-Application-Milestone-Project"
            target="_blank"
            class="social-icon"
            aria-label="GitHub"
          >
            <GithubIcon :size="20" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'
import { GithubIcon } from 'lucide-vue-next'

const themeStore = useThemeStore()
const isDark = themeStore.isDark()
</script>

<style scoped src="../../assets/styles/components/Footer.css">

</style>