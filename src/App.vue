<template>
  <AppLayout v-if="!isAuthRoute" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const route = useRoute()

const isAuthRoute = computed(() => {
  return route.path === '/login' || route.path === '/signup'
})
</script>

<style>
@import './assets/styles/main.css';
</style>