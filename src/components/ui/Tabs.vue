<template>
  <div class="ui-tabs">
    <div class="ui-tabs__header" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="[
          'ui-tabs__tab',
          {
            'ui-tabs__tab--active': modelValue === tab.value
          }
        ]"
        :aria-selected="modelValue === tab.value"
        role="tab"
        @click="handleTabClick(tab.value)"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="ui-tabs__badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div class="ui-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string
  value: string | number
  badge?: string | number
}

interface Props {
  modelValue: string | number
  tabs: Tab[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const handleTabClick = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.ui-tabs {
  width: 100%;
}

.ui-tabs__header {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-border-light);
  overflow-x: auto;
}

.ui-tabs__tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
}

.ui-tabs__tab:hover {
  color: var(--color-text);
}

.ui-tabs__tab--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.ui-tabs__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--color-surface-secondary);
  color: var(--color-text);
  border-radius: 9999px;
}

.ui-tabs__tab--active .ui-tabs__badge {
  background-color: var(--color-primary);
  color: white;
}

.ui-tabs__content {
  padding: 1.5rem 0;
}
</style>
