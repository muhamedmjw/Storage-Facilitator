<template>
  <label
    :class="[
      'ui-checkbox',
      {
        'ui-checkbox--disabled': disabled,
        'ui-checkbox--error': error
      }
    ]"
  >
    <input
      :id="checkboxId"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-label="ariaLabel || label"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-required="required"
      :aria-disabled="disabled"
      class="ui-checkbox__input"
      @change="handleChange"
    />
    <span class="ui-checkbox__checkmark" aria-hidden="true"></span>
    <span v-if="label" class="ui-checkbox__label">
      {{ label }}
      <span v-if="required" class="ui-checkbox__required" aria-label="required">*</span>
    </span>
    <slot></slot>
  </label>
  <span
    v-if="error"
    :id="errorId"
    class="ui-checkbox__error"
    role="alert"
    aria-live="polite"
  >{{ error }}</span>
  <span
    v-else-if="hint"
    :id="hintId"
    class="ui-checkbox__hint"
  >{{ hint }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  id?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const checkboxId = computed(() => props.id || `ui-checkbox-${Math.random().toString(36).substr(2, 9)}`)
const errorId = computed(() => `${checkboxId.value}-error`)
const hintId = computed(() => `${checkboxId.value}-hint`)

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId.value)
  if (props.hint && !props.error) ids.push(hintId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}
</script>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
}

.ui-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.ui-checkbox__checkmark {
  position: relative;
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  background-color: var(--color-input-bg);
  border: 2px solid var(--color-input-border);
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.ui-checkbox__input:checked ~ .ui-checkbox__checkmark {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-checkbox__input:checked ~ .ui-checkbox__checkmark::after {
  content: '';
  position: absolute;
  left: 0.375rem;
  top: 0.125rem;
  width: 0.375rem;
  height: 0.625rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.ui-checkbox__input:focus-visible ~ .ui-checkbox__checkmark {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.ui-checkbox__input:focus:not(:focus-visible) ~ .ui-checkbox__checkmark {
  outline: none;
}

.ui-checkbox--error .ui-checkbox__checkmark {
  border-color: var(--color-error);
}

.ui-checkbox__label {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.5;
  user-select: none;
}

.ui-checkbox__required {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.ui-checkbox__error {
  display: block;
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 0.375rem;
}

.ui-checkbox__hint {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-top: 0.375rem;
}
</style>

