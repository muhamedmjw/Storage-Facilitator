<template>
  <div
    :class="[
      'ui-divider',
      {
        'ui-divider--vertical': vertical,
        'ui-divider--with-text': $slots.default
      }
    ]"
    role="separator"
  >
    <span v-if="$slots.default" class="ui-divider__text">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  vertical?: boolean
}

withDefaults(defineProps<Props>(), {
  vertical: false
})
</script>

<style scoped>
.ui-divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-border);
  position: relative;
  margin: 1rem 0;
}

.ui-divider--vertical {
  width: 1px;
  height: 100%;
  margin: 0 1rem;
}

.ui-divider--with-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: none;
}

.ui-divider--with-text::before,
.ui-divider--with-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
}

.ui-divider__text {
  padding: 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
  background-color: var(--color-background);
}
</style>

