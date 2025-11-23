<template>
  <label
    :class="[
      'ui-radio',
      {
        'ui-radio--disabled': disabled,
        'ui-radio--error': error
      }
    ]"
  >
    <input
      :id="radioId"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :required="required"
      class="ui-radio__input"
      @change="handleChange"
    />
    <span class="ui-radio__checkmark"></span>
    <span v-if="label" class="ui-radio__label">
      {{ label }}
      <span v-if="required" class="ui-radio__required">*</span>
    </span>
    <slot></slot>
  </label>
  <span v-if="error" class="ui-radio__error">{{ error }}</span>
  <span v-else-if="hint" class="ui-radio__hint">{{ hint }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number | boolean
  value: string | number | boolean
  name: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [event: Event]
}>()

const radioId = computed(() => props.id || `ui-radio-${Math.random().toString(36).substr(2, 9)}`)

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const handleChange = (event: Event) => {
  emit('update:modelValue', props.value)
  emit('change', event)
}
</script>

<style scoped>
.ui-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
}

.ui-radio--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-radio__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.ui-radio__checkmark {
  position: relative;
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  min-height: 1.25rem;
  background-color: var(--color-input-bg);
  border: 2px solid var(--color-input-border);
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.ui-radio__input:checked ~ .ui-radio__checkmark {
  border-color: var(--color-primary);
}

.ui-radio__input:checked ~ .ui-radio__checkmark::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: var(--color-primary);
}

.ui-radio__input:focus ~ .ui-radio__checkmark {
  box-shadow: 0 0 0 3px rgba(30, 30, 30, 0.1);
}

.ui-radio--error .ui-radio__checkmark {
  border-color: var(--color-error);
}

.ui-radio__label {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.5;
  user-select: none;
}

.ui-radio__required {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.ui-radio__error {
  display: block;
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 0.375rem;
}

.ui-radio__hint {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-top: 0.375rem;
}
</style>
