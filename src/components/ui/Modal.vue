<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="ui-modal-overlay" @click="handleOverlayClick">
        <div
          :class="[
            'ui-modal',
            `ui-modal--${size}`
          ]"
          @click.stop
        >
          <div class="ui-modal__header">
            <h2 v-if="title" class="ui-modal__title">{{ title }}</h2>
            <button
              v-if="closable"
              class="ui-modal__close"
              @click="handleClose"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="ui-modal__body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="ui-modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}
</script>

<script lang="ts">
export default {
  name: 'UIModal'
}
</script>

<style scoped>
.ui-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.ui-modal {
  background: var(--color-surface);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.ui-modal--sm {
  max-width: 24rem;
}

.ui-modal--md {
  max-width: 32rem;
}

.ui-modal--lg {
  max-width: 48rem;
}

.ui-modal--xl {
  max-width: 64rem;
}

.ui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.ui-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.ui-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  padding: 0;
}

.ui-modal__close:hover {
  background-color: var(--color-hover);
  color: var(--color-text);
}

.ui-modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.ui-modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background-color: var(--color-surface-secondary);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .ui-modal,
.modal-leave-active .ui-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .ui-modal,
.modal-leave-to .ui-modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>
