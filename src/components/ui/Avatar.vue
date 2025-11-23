<template>
  <div
    :class="[
      'ui-avatar',
      `ui-avatar--${size}`,
      {
        'ui-avatar--square': square
      }
    ]"
    :style="avatarStyle"
  >
    <img v-if="src" :src="src" :alt="alt" @error="handleImageError" />
    <span v-else-if="name" class="ui-avatar__initials">{{ getInitials(name) }}</span>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  square?: boolean
  bgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  square: false,
  alt: ''
})

const imageError = ref(false)

const avatarStyle = computed(() => {
  if (props.bgColor && !props.src && !imageError.value) {
    return { backgroundColor: props.bgColor }
  }
  return {}
})

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-surface-secondary);
  color: var(--color-text);
  font-weight: 500;
  overflow: hidden;
  flex-shrink: 0;
}

.ui-avatar--square {
  border-radius: 0.375rem;
}

.ui-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}

.ui-avatar--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.875rem;
}

.ui-avatar--lg {
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
}

.ui-avatar--xl {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}

.ui-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ui-avatar__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

