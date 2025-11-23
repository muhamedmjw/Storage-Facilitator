# UI Kit Components

A comprehensive, reusable UI component library built with Vue 3, TypeScript, and CSS variables for theme support.

## Components

### Form Components

#### Button (`UIButton`)
A versatile button component with multiple variants and states.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `fullWidth`: `boolean` (default: `false`)
- `loading`: `boolean` (default: `false`)
- `loadingText`: `string` (optional)
- `disabled`: `boolean` (default: `false`)

**Usage:**
```vue
<UIButton variant="primary" @click="handleClick">Click Me</UIButton>
<UIButton loading loading-text="Processing...">Submit</UIButton>
```

#### Input (`UIInput`)
Text input component with label, error, and hint support.

**Props:**
- `modelValue`: `string | number` (required)
- `type`: `'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'` (default: `'text'`)
- `label`: `string` (optional)
- `placeholder`: `string` (optional)
- `hint`: `string` (optional)
- `error`: `string` (optional)
- `disabled`: `boolean` (default: `false`)
- `readonly`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Slots:**
- `prefix`: Icon or content before input
- `suffix`: Icon or content after input

**Usage:**
```vue
<UIInput v-model="value" label="Name" placeholder="Enter name" />
<UIInput v-model="email" type="email" label="Email" error="Invalid email" />
```

#### Textarea (`UITextarea`)
Multi-line text input component.

**Props:**
- `modelValue`: `string` (required)
- `label`: `string` (optional)
- `placeholder`: `string` (optional)
- `hint`: `string` (optional)
- `error`: `string` (optional)
- `rows`: `number` (default: `4`)
- `maxLength`: `number` (optional)
- `disabled`: `boolean` (default: `false`)
- `readonly`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Usage:**
```vue
<UITextarea v-model="description" label="Description" :max-length="500" />
```

#### Select (`UISelect`)
Dropdown select component.

**Props:**
- `modelValue`: `string | number` (required)
- `options`: `Array<string | number | { label: string; value: string | number }>` (required)
- `label`: `string` (optional)
- `placeholder`: `string` (optional)
- `hint`: `string` (optional)
- `error`: `string` (optional)
- `disabled`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Usage:**
```vue
<UISelect v-model="selected" :options="['Option 1', 'Option 2']" label="Choose" />
<UISelect v-model="selected" :options="[{ label: 'First', value: 'first' }]" />
```

#### Checkbox (`UICheckbox`)
Checkbox input component.

**Props:**
- `modelValue`: `boolean` (required)
- `label`: `string` (optional)
- `hint`: `string` (optional)
- `error`: `string` (optional)
- `disabled`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Usage:**
```vue
<UICheckbox v-model="accepted" label="Accept terms" />
```

#### Radio (`UIRadio`)
Radio button component.

**Props:**
- `modelValue`: `string | number | boolean` (required)
- `value`: `string | number | boolean` (required)
- `name`: `string` (required)
- `label`: `string` (optional)
- `hint`: `string` (optional)
- `error`: `string` (optional)
- `disabled`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Usage:**
```vue
<UIRadio v-model="choice" name="group" value="option1" label="Option 1" />
<UIRadio v-model="choice" name="group" value="option2" label="Option 2" />
```

### Display Components

#### Card (`UICard`)
Container component for grouping content.

**Props:**
- `title`: `string` (optional)
- `subtitle`: `string` (optional)
- `hover`: `boolean` (default: `false`)
- `clickable`: `boolean` (default: `false`)
- `bordered`: `boolean` (default: `false`)

**Slots:**
- `header`: Custom header content
- `footer`: Footer content
- Default: Main content

**Usage:**
```vue
<UICard title="Card Title" subtitle="Subtitle">
  <p>Card content</p>
  <template #footer>
    <UIButton>Action</UIButton>
  </template>
</UICard>
```

#### Badge (`UIBadge`)
Small status indicator component.

**Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `dot`: `boolean` (default: `false`)

**Usage:**
```vue
<UIBadge variant="success">Active</UIBadge>
<UIBadge variant="error" dot>Error</UIBadge>
```

#### Avatar (`UIAvatar`)
User avatar component with fallback to initials.

**Props:**
- `src`: `string` (optional) - Image URL
- `alt`: `string` (optional)
- `name`: `string` (optional) - Used for initials if no image
- `size`: `'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `square`: `boolean` (default: `false`)
- `bgColor`: `string` (optional) - Custom background color

**Usage:**
```vue
<UIAvatar name="John Doe" />
<UIAvatar src="/avatar.jpg" alt="User" />
```

#### Divider (`UIDivider`)
Horizontal or vertical divider component.

**Props:**
- `vertical`: `boolean` (default: `false`)

**Usage:**
```vue
<UIDivider />
<UIDivider>Or</UIDivider>
<UIDivider vertical />
```

### Feedback Components

#### Alert (`UIAlert`)
Alert message component.

**Props:**
- `variant`: `'info' | 'success' | 'warning' | 'error'` (default: `'info'`)
- `title`: `string` (optional)
- `closable`: `boolean` (default: `false`)

**Slots:**
- `icon`: Custom icon
- Default: Alert message

**Usage:**
```vue
<UIAlert variant="success" title="Success" closable @close="handleClose">
  Operation completed!
</UIAlert>
```

#### Modal (`UIModal`)
Modal dialog component.

**Props:**
- `modelValue`: `boolean` (required)
- `title`: `string` (optional)
- `size`: `'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `closable`: `boolean` (default: `true`)
- `closeOnOverlay`: `boolean` (default: `true`)

**Slots:**
- `footer`: Footer content with action buttons
- Default: Modal body content

**Events:**
- `update:modelValue`: Emitted when modal should close
- `close`: Emitted when modal is closed

**Usage:**
```vue
<UIModal v-model="showModal" title="Confirm" size="md">
  <p>Are you sure?</p>
  <template #footer>
    <UIButton variant="ghost" @click="showModal = false">Cancel</UIButton>
    <UIButton @click="handleConfirm">Confirm</UIButton>
  </template>
</UIModal>
```

#### Spinner (`UISpinner`)
Loading spinner component.

**Props:**
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'error'` (default: `'primary'`)
- `label`: `string` (optional)

**Usage:**
```vue
<UISpinner />
<UISpinner size="lg" variant="success" label="Loading..." />
```

### Navigation Components

#### Tabs (`UITabs`)
Tab navigation component.

**Props:**
- `modelValue`: `string | number` (required)
- `tabs`: `Array<{ label: string; value: string | number; badge?: string | number }>` (required)

**Events:**
- `update:modelValue`: Emitted when tab changes
- `change`: Emitted when tab changes

**Usage:**
```vue
<UITabs v-model="activeTab" :tabs="tabs">
  <div v-if="activeTab === 'tab1'">Tab 1 Content</div>
  <div v-if="activeTab === 'tab2'">Tab 2 Content</div>
</UITabs>
```

## Theme Support

All components use CSS variables defined in `src/assets/styles/main.css` and automatically support light/dark themes. The theme can be toggled using the `useThemeStore` composable.

## Importing Components

```typescript
import { UIButton, UIInput, UICard } from '@/components/ui'
```

Or import individually:

```typescript
import UIButton from '@/components/ui/Button.vue'
```

## Viewing the Showcase

Navigate to `/ui-kit` route to see all components in action with examples.

