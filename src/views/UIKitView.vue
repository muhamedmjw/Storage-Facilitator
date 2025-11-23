<template>
  <div class="ui-kit-showcase">
    <div class="ui-kit-showcase__header">
      <h1>UI Kit Showcase</h1>
      <p>Reusable components built with Vue 3 and TypeScript</p>
    </div>

    <div class="ui-kit-showcase__content">
      <!-- Buttons Section -->
      <section class="ui-kit-section">
        <h2>Buttons</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Variants</h3>
            <div class="ui-kit-section__demo">
              <UIButton variant="primary">Primary</UIButton>
              <UIButton variant="secondary">Secondary</UIButton>
              <UIButton variant="outline">Outline</UIButton>
              <UIButton variant="ghost">Ghost</UIButton>
              <UIButton variant="danger">Danger</UIButton>
              <UIButton variant="success">Success</UIButton>
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Sizes</h3>
            <div class="ui-kit-section__demo">
              <UIButton size="sm">Small</UIButton>
              <UIButton size="md">Medium</UIButton>
              <UIButton size="lg">Large</UIButton>
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>States</h3>
            <div class="ui-kit-section__demo">
              <UIButton>Normal</UIButton>
              <UIButton disabled>Disabled</UIButton>
              <UIButton loading>Loading</UIButton>
              <UIButton loading loading-text="Processing...">With Text</UIButton>
              <UIButton full-width>Full Width</UIButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Inputs Section -->
      <section class="ui-kit-section">
        <h2>Inputs</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Basic Input</h3>
            <div class="ui-kit-section__demo">
              <UIInput v-model="inputValue" label="Name" placeholder="Enter your name" />
              <UIInput v-model="emailValue" type="email" label="Email" placeholder="email@example.com" />
              <UIInput v-model="passwordValue" type="password" label="Password" placeholder="Enter password" />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Input States</h3>
            <div class="ui-kit-section__demo">
              <UIInput v-model="hintValue" label="With Hint" hint="This is a helpful hint" />
              <UIInput v-model="errorValue" label="With Error" error="This field is required" />
              <UIInput v-model="disabledValue" label="Disabled" disabled value="Disabled input" />
              <UIInput v-model="requiredValue" label="Required" required />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Input with Icons</h3>
            <div class="ui-kit-section__demo">
              <UIInput v-model="searchValue" placeholder="Search...">
                <template #prefix>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM11 11l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </template>
              </UIInput>
            </div>
          </div>
        </div>
      </section>

      <!-- Textarea Section -->
      <section class="ui-kit-section">
        <h2>Textarea</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo">
            <UITextarea v-model="textareaValue" label="Description" placeholder="Enter description" />
            <UITextarea v-model="textareaMaxValue" label="With Max Length" :max-length="100" />
          </div>
        </div>
      </section>

      <!-- Select Section -->
      <section class="ui-kit-section">
        <h2>Select</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo">
            <UISelect
              v-model="selectValue"
              label="Choose Option"
              placeholder="Select an option"
              :options="selectOptions"
            />
            <UISelect
              v-model="selectObjectValue"
              label="Object Options"
              :options="selectObjectOptions"
            />
          </div>
        </div>
      </section>

      <!-- Checkbox & Radio Section -->
      <section class="ui-kit-section">
        <h2>Checkbox & Radio</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Checkbox</h3>
            <div class="ui-kit-section__demo">
              <UICheckbox v-model="checkboxValue" label="Accept terms and conditions" />
              <UICheckbox v-model="checkboxRequired" label="Required checkbox" required />
              <UICheckbox v-model="checkboxDisabled" label="Disabled checkbox" disabled />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Radio</h3>
            <div class="ui-kit-section__demo">
              <UIRadio v-model="radioValue" name="radio-group" value="option1" label="Option 1" />
              <UIRadio v-model="radioValue" name="radio-group" value="option2" label="Option 2" />
              <UIRadio v-model="radioValue" name="radio-group" value="option3" label="Option 3" />
            </div>
          </div>
        </div>
      </section>

      <!-- Cards Section -->
      <section class="ui-kit-section">
        <h2>Cards</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
            <UICard title="Basic Card" subtitle="Card subtitle">
              <p>This is a basic card with title and subtitle.</p>
            </UICard>
            <UICard hover>
              <p>This card has hover effect.</p>
            </UICard>
            <UICard clickable @click="handleCardClick">
              <p>This card is clickable.</p>
            </UICard>
            <UICard bordered title="Bordered Card">
              <p>This card has a border.</p>
              <template #footer>
                <UIButton size="sm">Action</UIButton>
              </template>
            </UICard>
          </div>
        </div>
      </section>

      <!-- Badges Section -->
      <section class="ui-kit-section">
        <h2>Badges</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Variants</h3>
            <div class="ui-kit-section__demo">
              <UIBadge variant="primary">Primary</UIBadge>
              <UIBadge variant="secondary">Secondary</UIBadge>
              <UIBadge variant="success">Success</UIBadge>
              <UIBadge variant="warning">Warning</UIBadge>
              <UIBadge variant="error">Error</UIBadge>
              <UIBadge variant="info">Info</UIBadge>
              <UIBadge variant="neutral">Neutral</UIBadge>
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Sizes</h3>
            <div class="ui-kit-section__demo">
              <UIBadge size="sm">Small</UIBadge>
              <UIBadge size="md">Medium</UIBadge>
              <UIBadge size="lg">Large</UIBadge>
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>With Dot</h3>
            <div class="ui-kit-section__demo">
              <UIBadge variant="success" dot>Available</UIBadge>
              <UIBadge variant="error" dot>Unavailable</UIBadge>
            </div>
          </div>
        </div>
      </section>

      <!-- Alerts Section -->
      <section class="ui-kit-section">
        <h2>Alerts</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo" style="display: flex; flex-direction: column; gap: 1rem;">
            <UIAlert variant="info" title="Info Alert" closable @close="() => {}">
              This is an info alert with a title.
            </UIAlert>
            <UIAlert variant="success" title="Success Alert" closable @close="() => {}">
              Operation completed successfully!
            </UIAlert>
            <UIAlert variant="warning" title="Warning Alert" closable @close="() => {}">
              Please review your input before proceeding.
            </UIAlert>
            <UIAlert variant="error" title="Error Alert" closable @close="() => {}">
              An error occurred. Please try again.
            </UIAlert>
          </div>
        </div>
      </section>

      <!-- Modal Section -->
      <section class="ui-kit-section">
        <h2>Modal</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo">
            <UIButton @click="showModal = true">Open Modal</UIButton>
            <UIModal v-model="showModal" title="Example Modal" size="md">
              <p>This is a modal dialog. You can add any content here.</p>
              <template #footer>
                <UIButton variant="ghost" @click="showModal = false">Cancel</UIButton>
                <UIButton @click="showModal = false">Confirm</UIButton>
              </template>
            </UIModal>
          </div>
        </div>
      </section>

      <!-- Spinner Section -->
      <section class="ui-kit-section">
        <h2>Spinner</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Sizes</h3>
            <div class="ui-kit-section__demo">
              <UISpinner size="sm" />
              <UISpinner size="md" />
              <UISpinner size="lg" />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Variants</h3>
            <div class="ui-kit-section__demo">
              <UISpinner variant="primary" />
              <UISpinner variant="secondary" />
              <UISpinner variant="success" />
              <UISpinner variant="warning" />
              <UISpinner variant="error" />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>With Label</h3>
            <div class="ui-kit-section__demo">
              <UISpinner label="Loading..." />
            </div>
          </div>
        </div>
      </section>

      <!-- Avatar Section -->
      <section class="ui-kit-section">
        <h2>Avatar</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__group">
            <h3>Sizes</h3>
            <div class="ui-kit-section__demo">
              <UIAvatar name="John Doe" size="sm" />
              <UIAvatar name="Jane Smith" size="md" />
              <UIAvatar name="Bob Johnson" size="lg" />
              <UIAvatar name="Alice Brown" size="xl" />
            </div>
          </div>
          <div class="ui-kit-section__group">
            <h3>Square</h3>
            <div class="ui-kit-section__demo">
              <UIAvatar name="John Doe" square />
            </div>
          </div>
        </div>
      </section>

      <!-- Tabs Section -->
      <section class="ui-kit-section">
        <h2>Tabs</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo">
            <UITabs v-model="activeTab" :tabs="tabs">
              <div v-if="activeTab === 'tab1'">
                <p>Content for Tab 1</p>
              </div>
              <div v-if="activeTab === 'tab2'">
                <p>Content for Tab 2</p>
              </div>
              <div v-if="activeTab === 'tab3'">
                <p>Content for Tab 3</p>
              </div>
            </UITabs>
          </div>
        </div>
      </section>

      <!-- Divider Section -->
      <section class="ui-kit-section">
        <h2>Divider</h2>
        <div class="ui-kit-section__content">
          <div class="ui-kit-section__demo" style="display: flex; flex-direction: column; gap: 1rem;">
            <p>Content above</p>
            <UIDivider />
            <p>Content below</p>
            <UIDivider>Or</UIDivider>
            <p>More content</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UIButton,
  UIInput,
  UITextarea,
  UISelect,
  UICheckbox,
  UIRadio,
  UICard,
  UIBadge,
  UIModal,
  UIAlert,
  UISpinner,
  UIAvatar,
  UITabs,
  UIDivider
} from '@/components/ui'

// Form values
const inputValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const hintValue = ref('')
const errorValue = ref('')
const disabledValue = ref('')
const requiredValue = ref('')
const searchValue = ref('')
const textareaValue = ref('')
const textareaMaxValue = ref('')
const selectValue = ref('')
const selectObjectValue = ref('')
const checkboxValue = ref(false)
const checkboxRequired = ref(false)
const checkboxDisabled = ref(false)
const radioValue = ref('option1')

// Select options
const selectOptions = ['Option 1', 'Option 2', 'Option 3']
const selectObjectOptions = [
  { label: 'First Option', value: 'first' },
  { label: 'Second Option', value: 'second' },
  { label: 'Third Option', value: 'third' }
]

// Modal
const showModal = ref(false)

// Tabs
const activeTab = ref('tab1')
const tabs = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2', badge: '3' },
  { label: 'Tab 3', value: 'tab3' }
]

const handleCardClick = () => {
  alert('Card clicked!')
}
</script>

<style scoped>
.ui-kit-showcase {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.ui-kit-showcase__header {
  margin-bottom: 3rem;
  text-align: center;
}

.ui-kit-showcase__header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.ui-kit-showcase__header p {
  font-size: 1.125rem;
  color: var(--color-text-light);
}

.ui-kit-section {
  margin-bottom: 4rem;
}

.ui-kit-section h2 {
  font-size: 1.875rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-border-light);
}

.ui-kit-section__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ui-kit-section__group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ui-kit-section__group h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-light);
}

.ui-kit-section__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-light);
}
</style>

