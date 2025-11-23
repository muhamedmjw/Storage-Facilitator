<template>
  <div class="ui-textarea-wrapper">
    <label v-if="label" :for="textareaId" class="ui-textarea__label">
      {{ label }}
      <span v-if="required" class="ui-textarea__required">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rows="rows"
      :aria-label="ariaLabel || label"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-required="required"
      :aria-disabled="disabled"
      :maxlength="maxLength"
      :class="[
        'ui-textarea',
        {
          'ui-textarea--error': error
        }
      ]"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    ></textarea>
    <div class="ui-textarea__footer">
      <span
        v-if="error"
        :id="errorId"
        class="ui-textarea__error"
        role="alert"
        aria-live="polite"
      >{{ error }}</span>
      <span
        v-else-if="hint"
        :id="hintId"
        class="ui-textarea__hint"
      >{{ hint }}</span>
      <span
        v-if="maxLength"
        :id="counterId"
        class="ui-textarea__counter"
        :aria-live="maxLength ? 'polite' : undefined"
      >
        {{ currentLength }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  id?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  disabled: false,
  readonly: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaId = computed(() => props.id || `ui-textarea-${Math.random().toString(36).substr(2, 9)}`)
const errorId = computed(() => `${textareaId.value}-error`)
const hintId = computed(() => `${textareaId.value}-hint`)
const counterId = computed(() => `${textareaId.value}-counter`)

const currentLength = computed(() => {
  return props.modelValue?.length || 0
})

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId.value)
  if (props.hint && !props.error) ids.push(hintId.value)
  if (props.maxLength) ids.push(counterId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<style scoped>
.ui-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.ui-textarea__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.ui-textarea__required {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.ui-textarea {
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
  resize: vertical;
  font-family: inherit;
}

.ui-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 30, 30, 0.1);
}

.ui-textarea:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.ui-textarea:focus:not(:focus-visible) {
  outline: none;
}

.ui-textarea--error {
  border-color: var(--color-error);
}

.ui-textarea--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.ui-textarea:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: var(--color-surface-secondary);
}

.ui-textarea::placeholder {
  color: var(--color-text-lighter);
}

.ui-textarea__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.ui-textarea__error {
  font-size: 0.875rem;
  color: var(--color-error);
}

.ui-textarea__hint {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.ui-textarea__counter {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-left: auto;
}
</style>

