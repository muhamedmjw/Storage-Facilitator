<template>
  <div class="ui-select-wrapper">
    <label v-if="label" :for="selectId" class="ui-select__label">
      {{ label }}
      <span v-if="required" class="ui-select__required">*</span>
    </label>
    <div class="ui-select__container">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'ui-select',
          {
            'ui-select--error': error
          }
        ]"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="getOptionValue(option)"
          :value="getOptionValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
      <span class="ui-select__icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <span v-if="error" class="ui-select__error">{{ error }}</span>
    <span v-else-if="hint" class="ui-select__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type OptionValue = string | number
type Option = OptionValue | { label: string; value: OptionValue; disabled?: boolean }

interface Props {
  modelValue: OptionValue
  options: Option[]
  label?: string
  placeholder?: string
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
  'update:modelValue': [value: OptionValue]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const selectId = computed(() => props.id || `ui-select-${Math.random().toString(36).substr(2, 9)}`)

const getOptionValue = (option: Option): OptionValue => {
  return typeof option === 'object' ? option.value : option
}

const getOptionLabel = (option: Option): string => {
  return typeof option === 'object' ? option.label : String(option)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
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
.ui-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.ui-select__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.ui-select__required {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.ui-select__container {
  position: relative;
}

.ui-select {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-text);
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-input-border);
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  outline: none;
  appearance: none;
  cursor: pointer;
  font-family: inherit;
}

.ui-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(30, 30, 30, 0.1);
}

.ui-select--error {
  border-color: var(--color-error);
}

.ui-select--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.ui-select:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: var(--color-surface-secondary);
}

.ui-select__icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-text-light);
}

.ui-select__error {
  font-size: 0.875rem;
  color: var(--color-error);
}

.ui-select__hint {
  font-size: 0.875rem;
  color: var(--color-text-light);
}
</style>
