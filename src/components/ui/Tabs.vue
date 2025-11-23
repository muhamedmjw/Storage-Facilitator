<template>
  <div class="ui-tabs">
    <div class="ui-tabs__header" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :ref="el => { if (el) tabRefs[index] = el as HTMLButtonElement }"
        :class="[
          'ui-tabs__tab',
          {
            'ui-tabs__tab--active': modelValue === tab.value
          }
        ]"
        :aria-selected="modelValue === tab.value"
        :aria-controls="`tabpanel-${index}`"
        :id="`tab-${index}`"
        :tabindex="modelValue === tab.value ? 0 : -1"
        role="tab"
        type="button"
        @click="handleTabClick(tab.value)"
        @keydown="(e) => handleKeyDown(e, index)"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="ui-tabs__badge" aria-label="Badge: {{ tab.badge }}">{{ tab.badge }}</span>
      </button>
    </div>
    <div
      class="ui-tabs__content"
      role="tabpanel"
      :id="`tabpanel-${activeTabIndex}`"
      :aria-labelledby="`tab-${activeTabIndex}`"
      tabindex="0"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Tab {
  label: string
  value: string | number
  badge?: string | number
}

interface Props {
  modelValue: string | number
  tabs: Tab[]
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Tabs'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const tabRefs = ref<(HTMLButtonElement | null)[]>([])

const activeTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.value === props.modelValue)
})

const handleTabClick = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
  let targetIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      targetIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
      break
    case 'ArrowRight':
      event.preventDefault()
      targetIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      event.preventDefault()
      targetIndex = 0
      break
    case 'End':
      event.preventDefault()
      targetIndex = props.tabs.length - 1
      break
    default:
      return
  }

  const targetTab = props.tabs[targetIndex]
  if (targetTab) {
    handleTabClick(targetTab.value)
    // Focus the new tab
    nextTick(() => {
      if (tabRefs.value[targetIndex]) {
        tabRefs.value[targetIndex]?.focus()
      }
    })
  }
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

.ui-tabs__tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.25rem 0.25rem 0 0;
}

.ui-tabs__tab:focus:not(:focus-visible) {
  outline: none;
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

