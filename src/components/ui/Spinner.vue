<template>
  <div
    :class="[
      'ui-spinner',
      `ui-spinner--${size}`,
      `ui-spinner--${variant}`
    ]"
    role="status"
    aria-label="Loading"
  >
    <svg
      class="ui-spinner__svg"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="ui-spinner__circle"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="31.416"
        stroke-dashoffset="31.416"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="2s"
          values="0 31.416;15.708 15.708;0 31.416;0 31.416"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="2s"
          values="0;-15.708;-31.416;-31.416"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <span v-if="label" class="ui-spinner__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  label?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary'
})
</script>

<style scoped>
.ui-spinner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.ui-spinner__svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ui-spinner--sm {
  width: 1rem;
  height: 1rem;
}

.ui-spinner--md {
  width: 2rem;
  height: 2rem;
}

.ui-spinner--lg {
  width: 3rem;
  height: 3rem;
}

.ui-spinner--sm .ui-spinner__svg {
  width: 1rem;
  height: 1rem;
}

.ui-spinner--md .ui-spinner__svg {
  width: 2rem;
  height: 2rem;
}

.ui-spinner--lg .ui-spinner__svg {
  width: 3rem;
  height: 3rem;
}

.ui-spinner--primary {
  color: var(--color-primary);
}

.ui-spinner--secondary {
  color: var(--color-secondary);
}

.ui-spinner--success {
  color: var(--color-success);
}

.ui-spinner--warning {
  color: var(--color-warning);
}

.ui-spinner--error {
  color: var(--color-error);
}

.ui-spinner__label {
  font-size: 0.875rem;
  color: var(--color-text-light);
}
</style>

