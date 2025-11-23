<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="ui-modal-overlay"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="title ? modalTitleId : undefined"
        :aria-describedby="modalBodyId"
        @click="handleOverlayClick"
        @keydown="handleKeyDown"
      >
        <div
          ref="modalRef"
          :class="[
            'ui-modal',
            `ui-modal--${size}`
          ]"
          @click.stop
        >
          <div class="ui-modal__header">
            <h2 v-if="title" :id="modalTitleId" class="ui-modal__title">{{ title }}</h2>
            <button
              v-if="closable"
              ref="closeButtonRef"
              class="ui-modal__close"
              @click="handleClose"
              aria-label="Close modal"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div :id="modalBodyId" class="ui-modal__body">
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
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

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

const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)

const modalTitleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)
const modalBodyId = computed(() => `modal-body-${Math.random().toString(36).substr(2, 9)}`)

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
  // Restore focus to previous element
  if (previousActiveElement.value) {
    previousActiveElement.value.focus()
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Close on Escape key
  if (event.key === 'Escape' && props.closable) {
    handleClose()
  }
  
  // Trap focus within modal (Tab key)
  if (event.key === 'Tab' && modalRef.value) {
    const focusableElements = modalRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

// Focus management
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    // Store current active element
    previousActiveElement.value = document.activeElement as HTMLElement
    
    await nextTick()
    // Focus first focusable element or close button
    if (closeButtonRef.value) {
      closeButtonRef.value.focus()
    } else if (modalRef.value) {
      const firstFocusable = modalRef.value.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }
  }
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
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

.ui-modal__close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.ui-modal__close:focus:not(:focus-visible) {
  outline: none;
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

