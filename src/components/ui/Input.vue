<template>
  <div class="ui-input-wrapper">
    <label v-if="label" :for="inputId" class="ui-input__label">
      {{ label }}
      <span v-if="required" class="ui-input__required" aria-label="required">*</span>
    </label>
    <div class="ui-input__container">
      <span v-if="$slots.prefix" class="ui-input__prefix" aria-hidden="true">
        <slot name="prefix"></slot>
      </span>
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-label="ariaLabel || label"
        :aria-describedby="describedBy"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-required="required"
        :aria-disabled="disabled"
        :autocomplete="autocomplete"
        :class="[
          'ui-input',
          {
            'ui-input--error': error,
            'ui-input--with-prefix': $slots.prefix,
            'ui-input--with-suffix': $slots.suffix
          }
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeyDown"
      />
      <span v-if="$slots.suffix" class="ui-input__suffix" aria-hidden="true">
        <slot name="suffix"></slot>
      </span>
    </div>
    <span
      v-if="error"
      :id="errorId"
      class="ui-input__error"
      role="alert"
      aria-live="polite"
    >{{ error }}</span>
    <span
      v-else-if="hint"
      :id="hintId"
      class="ui-input__hint"
    >{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  id?: string
  ariaLabel?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const inputId = computed(() => props.id || `ui-input-${Math.random().toString(36).substr(2, 9)}`)
const errorId = computed(() => `${inputId.value}-error`)
const hintId = computed(() => `${inputId.value}-hint`)

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId.value)
  if (props.hint && !props.error) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleKeyDown = (event: KeyboardEvent) => {
  emit('keydown', event)
}
</script>

<style scoped>
.ui-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.ui-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.ui-input__required {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.ui-input__container {
  position: relative;
  display: flex;
  align-items: center;
}

.ui-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-text);
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-input-border);
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  outline: none;
}

.ui-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 30, 30, 0.1);
}

.ui-input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.ui-input:focus:not(:focus-visible) {
  outline: none;
}

.ui-input--error {
  border-color: var(--color-error);
}

.ui-input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.ui-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: var(--color-surface-secondary);
}

.ui-input::placeholder {
  color: var(--color-text-lighter);
}

.ui-input--with-prefix {
  padding-left: 2.5rem;
}

.ui-input--with-suffix {
  padding-right: 2.5rem;
}

.ui-input__prefix,
.ui-input__suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
  pointer-events: none;
}

.ui-input__prefix {
  left: 0.75rem;
}

.ui-input__suffix {
  right: 0.75rem;
}

.ui-input__error {
  font-size: 0.875rem;
  color: var(--color-error);
}

.ui-input__hint {
  font-size: 0.875rem;
  color: var(--color-text-light);
}
</style>

