# Accessibility Test Cases for UI Kit

## Test Case 1: Keyboard Navigation - Button Focus States
**Objective:** Verify visible focus indicators on buttons when navigating with keyboard

**Steps:**
1. Navigate to `/ui-kit` page
2. Press `Tab` key to move focus through buttons
3. Observe the focus indicator on each button

**Expected Results:**
- ✅ Each button shows a **2px solid outline** when focused (visible focus ring)
- ✅ Focus moves sequentially through all buttons
- ✅ Pressing `Enter` or `Space` activates the focused button
- ✅ Disabled buttons are skipped in tab order
- ✅ Loading buttons show spinner and are not clickable

**What to Look For:**
- **Before:** No visible focus indicator or very subtle outline
- **After:** Clear, visible 2px outline in primary color around focused button

---

## Test Case 2: Modal Keyboard Navigation & Focus Trap
**Objective:** Verify modal can be controlled entirely with keyboard and traps focus

**Steps:**
1. Navigate to `/ui-kit` page
2. Scroll to "Modal" section
3. Press `Tab` to focus "Open Modal" button, then press `Enter`
4. Once modal opens, try pressing `Tab` multiple times
5. Press `Escape` key
6. After closing, press `Tab` again

**Expected Results:**
- ✅ Modal opens when pressing `Enter` on button
- ✅ Focus moves **only within the modal** (not to page behind)
- ✅ Focus cycles: Close button → Modal content → Footer buttons → back to Close
- ✅ Pressing `Escape` closes the modal
- ✅ After closing, focus returns to the "Open Modal" button
- ✅ Page behind modal is dimmed and not accessible

**What to Look For:**
- **Before:** Tab would escape modal and focus page elements behind it
- **After:** Focus is trapped inside modal, Escape closes it, focus returns to trigger

---

## Test Case 3: Tabs Arrow Key Navigation
**Objective:** Verify tabs can be navigated using arrow keys

**Steps:**
1. Navigate to `/ui-kit` page
2. Scroll to "Tabs" section
3. Click on "Tab 1" to activate it
4. Press `Right Arrow` key
5. Press `Left Arrow` key
6. Press `Home` key
7. Press `End` key

**Expected Results:**
- ✅ Pressing `Right Arrow` moves to next tab (Tab 2 → Tab 3)
- ✅ Pressing `Left Arrow` moves to previous tab (Tab 3 → Tab 2)
- ✅ At last tab, `Right Arrow` wraps to first tab
- ✅ At first tab, `Left Arrow` wraps to last tab
- ✅ Pressing `Home` jumps to first tab
- ✅ Pressing `End` jumps to last tab
- ✅ Active tab shows visual indicator (underline)
- ✅ Tab content updates when switching tabs

**What to Look For:**
- **Before:** Tabs only worked with mouse clicks
- **After:** Full keyboard navigation with arrow keys, Home, and End

---

## Test Case 4: Form Input ARIA & Error Announcements
**Objective:** Verify form inputs have proper ARIA attributes and error messages are accessible

**Steps:**
1. Navigate to `/ui-kit` page
2. Scroll to "Inputs" section
3. Find the input with label "With Error"
4. Press `Tab` to focus the input
5. Type some text, then clear it
6. Press `Tab` to move to next field
7. Check the "Required" input field

**Expected Results:**
- ✅ Input with error shows **red border** and error message below
- ✅ Error message has `role="alert"` (announced by screen readers)
- ✅ Input has `aria-invalid="true"` when error exists
- ✅ Input has `aria-describedby` linking to error message
- ✅ Required fields show asterisk (*) with `aria-label="required"`
- ✅ Focus indicator (2px outline) appears on focused input
- ✅ Error message is visually distinct (red color)

**What to Look For:**
- **Before:** Errors might not be announced, no ARIA relationships
- **After:** Screen readers announce errors, proper ARIA attributes link inputs to messages

---

## Test Case 5: Clickable Card Keyboard Activation
**Objective:** Verify clickable cards can be activated with keyboard

**Steps:**
1. Navigate to `/ui-kit` page
2. Scroll to "Cards" section
3. Find the card labeled "This card is clickable"
4. Press `Tab` to focus the card
5. Press `Enter` or `Space` key
6. Observe the card's focus indicator

**Expected Results:**
- ✅ Card receives focus when tabbing (shows outline)
- ✅ Pressing `Enter` activates the card (shows alert "Card clicked!")
- ✅ Pressing `Space` also activates the card
- ✅ Card has `role="button"` for screen readers
- ✅ Card has `tabindex="0"` making it keyboard accessible
- ✅ Focus indicator is clearly visible (2px outline)

**What to Look For:**
- **Before:** Clickable cards only worked with mouse, no keyboard access
- **After:** Cards are fully keyboard accessible with visible focus indicators

---

## Bonus Test: Screen Reader Experience
**Objective:** Test with screen reader (NVDA/JAWS/VoiceOver)

**Steps:**
1. Enable screen reader (Windows: NVDA, Mac: VoiceOver)
2. Navigate to `/ui-kit` page
3. Use screen reader navigation to explore components

**Expected Results:**
- ✅ Buttons announce their label and state ("Primary button", "Loading button, busy")
- ✅ Inputs announce label, required status, and error messages
- ✅ Modal announces title and role ("Example Modal, dialog")
- ✅ Tabs announce current selection ("Tab 1, selected, 1 of 3")
- ✅ Alerts are immediately announced when they appear
- ✅ Form errors are read aloud when they occur

---

## Quick Visual Checklist

When testing, you should see these visual differences:

1. **Focus Rings:** All interactive elements show 2px outline when focused
2. **Error States:** Red borders and error messages with proper associations
3. **Modal Overlay:** Dimmed background when modal is open
4. **Tab Indicators:** Active tabs show underline, focused tabs show outline
5. **Button States:** Loading, disabled, and focused states are clearly visible

---

## How to Test Without Screen Reader

1. **Keyboard Only Test:**
   - Unplug your mouse/trackpad
   - Navigate entire UI kit using only keyboard
   - Everything should be accessible

2. **Focus Visibility Test:**
   - Press `Tab` repeatedly
   - Every focused element should show clear outline
   - No element should be "invisible" when focused

3. **Modal Focus Trap Test:**
   - Open modal
   - Press `Tab` 10 times
   - Focus should stay inside modal, not escape to page

4. **Form Validation Test:**
   - Fill form with invalid data
   - Error messages should appear and be clearly visible
   - Error messages should be associated with inputs

5. **Navigation Test:**
   - Use arrow keys on tabs
   - Use Escape on modal
   - Use Enter/Space on buttons and cards
   - All should work without mouse

