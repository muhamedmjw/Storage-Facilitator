<template>
  <span
    :class="[
      'ui-badge',
      `ui-badge--${variant}`,
      `ui-badge--${size}`,
      {
        'ui-badge--dot': dot
      }
    ]"
  >
    <span v-if="dot" class="ui-badge__dot"></span>
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  dot: false
})
</script>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
}

/* Variants */
.ui-badge--primary {
  background-color: rgba(30, 30, 30, 0.1);
  color: var(--color-primary);
}

.ui-badge--secondary {
  background-color: rgba(0, 46, 95, 0.1);
  color: var(--color-secondary);
}

.ui-badge--success {
  background-color: var(--color-occupied-bg);
  color: var(--color-occupied);
}

.ui-badge--warning {
  background-color: rgba(234, 179, 8, 0.1);
  color: var(--color-warning);
}

.ui-badge--error {
  background-color: var(--color-overdue-bg);
  color: var(--color-overdue);
}

.ui-badge--info {
  background-color: var(--color-available-bg);
  color: var(--color-available);
}

.ui-badge--neutral {
  background-color: var(--color-surface-secondary);
  color: var(--color-text);
}

/* Sizes */
.ui-badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.ui-badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ui-badge--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.ui-badge__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
}
</style>

