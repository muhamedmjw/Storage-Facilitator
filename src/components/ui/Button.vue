<template>
  <button
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      {
        'ui-button--full-width': fullWidth,
        'ui-button--loading': loading,
        'ui-button--disabled': disabled
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ui-button__spinner"></span>
    <slot v-if="!loading"></slot>
    <span v-else-if="loadingText">{{ loadingText }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  loadingText?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;
}

.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Variants */
.ui-button--primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.ui-button--primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.ui-button--secondary {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

.ui-button--secondary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.ui-button--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
}

.ui-button--ghost {
  background-color: transparent;
  color: var(--color-text);
  border-color: transparent;
}

.ui-button--ghost:hover:not(:disabled) {
  background-color: var(--color-hover);
}

.ui-button--danger {
  background-color: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

.ui-button--danger:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.ui-button--success {
  background-color: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.ui-button--success:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* Sizes */
.ui-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ui-button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.ui-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.ui-button--full-width {
  width: 100%;
}

/* Loading state */
.ui-button--loading {
  pointer-events: none;
}

.ui-button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
