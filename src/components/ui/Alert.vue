<template>
  <div
    :class="[
      'ui-alert',
      `ui-alert--${variant}`,
      {
        'ui-alert--closable': closable
      }
    ]"
    role="alert"
  >
    <div class="ui-alert__icon">
      <slot name="icon">
        <svg v-if="variant === 'success'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="variant === 'error'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="variant === 'warning'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6.667V10M10 13.333H10.008M18.333 10C18.333 14.602 14.602 18.333 10 18.333C5.398 18.333 1.667 14.602 1.667 10C1.667 5.398 5.398 1.667 10 1.667C14.602 1.667 18.333 5.398 18.333 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 5.398 14.602 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 14.602 5.398 18.333 10 18.333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 6.667V10M10 13.333H10.008" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </slot>
    </div>
    <div class="ui-alert__content">
      <div v-if="title" class="ui-alert__title">{{ title }}</div>
      <div class="ui-alert__message">
        <slot></slot>
      </div>
    </div>
    <button
      v-if="closable"
      class="ui-alert__close"
      @click="handleClose"
      aria-label="Close alert"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'info',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.ui-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
}

.ui-alert--info {
  background-color: var(--color-available-bg);
  border-color: var(--color-available);
  color: var(--color-available);
}

.ui-alert--success {
  background-color: var(--color-occupied-bg);
  border-color: var(--color-occupied);
  color: var(--color-occupied);
}

.ui-alert--warning {
  background-color: rgba(234, 179, 8, 0.1);
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.ui-alert--error {
  background-color: var(--color-overdue-bg);
  border-color: var(--color-overdue);
  color: var(--color-overdue);
}

.ui-alert__icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.ui-alert__content {
  flex: 1;
  min-width: 0;
}

.ui-alert__title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.ui-alert__message {
  font-size: 0.875rem;
  line-height: 1.5;
}

.ui-alert__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  padding: 0;
  opacity: 0.7;
}

.ui-alert__close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
