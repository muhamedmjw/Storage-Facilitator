<template>
  <div
    :class="[
      'ui-card',
      {
        'ui-card--hover': hover,
        'ui-card--clickable': clickable,
        'ui-card--bordered': bordered
      }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.header || title" class="ui-card__header">
      <slot name="header">
        <h3 v-if="title" class="ui-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="ui-card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    <div class="ui-card__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="ui-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  hover?: boolean
  clickable?: boolean
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false,
  clickable: false,
  bordered: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.ui-card {
  background: var(--color-surface);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
}

.ui-card--bordered {
  border: 1px solid var(--color-border);
}

.ui-card--hover:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.ui-card--clickable {
  cursor: pointer;
}

.ui-card--clickable:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.ui-card__header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.ui-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
}

.ui-card__subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--color-text-light);
  line-height: 1.5;
}

.ui-card__body {
  padding: 1.5rem;
}

.ui-card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-surface-secondary);
}
</style>
