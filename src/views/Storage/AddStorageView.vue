<template>
  <div class="add-storage-container">
    <div class="page-header">
      <div class="header-left">
        <router-link
          to="/storages"
          class="back-link"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line
              x1="19"
              y1="12"
              x2="5"
              y2="12"
            />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Units
        </router-link>
        <h1 class="page-title">
          Add New Storage Unit
        </h1>
        <p class="page-subtitle">
          Create a new storage unit in your facility
        </p>
      </div>
    </div>

    <div class="form-container">
      <form
        class="storage-form"
        @submit.prevent="createUnit"
      >
        <!-- Basic Information Section -->
        <div class="form-section">
          <div class="section-header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
              />
            </svg>
            <h3 class="section-title">
              Basic Information
            </h3>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label
                for="unitNumber"
                class="form-label"
              >Unit Number *</label>
              <input
                id="unitNumber"
                v-model="formData.unitNumber"
                type="text"
                class="form-input"
                placeholder="e.g., A-101, B-205"
                required
              >
              <span class="form-hint">Unique identifier for the storage unit</span>
            </div>

            <div class="form-group">
              <label
                for="size"
                class="form-label"
              >Unit Size *</label>
              <select
                id="size"
                v-model="formData.size"
                class="form-input"
                required
              >
                <option value="">
                  Select size
                </option>
                <option value="5x5">
                  15x15 meters (Small)
                </option>
                <option value="5x10">
                  15x30 meters (Medium)
                </option>
                <option value="30x30">
                  30x30 meters (Large)
                </option>
                <option value="30x45">
                  30x45 meters (Large)
                </option>
                <option value="30x60">
                  30x60 meters (X-Large)
                </option>
              </select>
            </div>

            <div class="form-group">
              <label
                for="monthlyRate"
                class="form-label"
              >Monthly Rate ($) *</label>
              <input
                id="monthlyRate"
                v-model="formData.monthlyRate"
                type="number"
                class="form-input"
                placeholder="150.00"
                step="0.01"
                min="0"
                required
              >
            </div>

            <div class="form-group">
              <label
                for="status"
                class="form-label"
              >Initial Status *</label>
              <select
                id="status"
                v-model="formData.status"
                class="form-input"
                required
              >
                <option value="available">
                  Available
                </option>
                <option value="reserved">
                  Reserved
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Location Details Section -->
        <div class="form-section">
          <div class="section-header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle
                cx="12"
                cy="10"
                r="3"
              />
            </svg>
            <h3 class="section-title">
              Location Details
            </h3>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label
                for="building"
                class="form-label"
              >Building</label>
              <input
                id="building"
                v-model="formData.building"
                type="text"
                class="form-input"
                placeholder="Building A, Building B..."
              >
            </div>

            <div class="form-group">
              <label
                for="unit"
                class="form-label"
              >Storage Unit</label>
              <input
                id="unit"
                v-model="formData.unit"
                type="text"
                class="form-input"
                placeholder="1, 2, 3..."
              >
            </div>
            

            <div class="form-group full-width">
              <label
                for="accessInstructions"
                class="form-label"
              >Instructions</label>
              <textarea
                id="accessInstructions"
                v-model="formData.accessInstructions"
                class="form-textarea"
                placeholder="Instructions for this unit..."
                rows="3"
              />
            </div>
          </div>
        </div>


        <!-- Additional Information Section -->
        <div class="form-section">
          <div class="section-header">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h3 class="section-title">
              Additional Information
            </h3>
          </div>

          <div class="form-group full-width">
            <label
              for="description"
              class="form-label"
            >Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Add any additional details about this storage unit..."
              rows="4"
            />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="$router.push('/storages')"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            class="btn-primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Create Storage Unit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { storageService } from '@/services/storageService'
  import type { StorageUnit } from '@/types'
  import { useToast } from "@/composables/useToast"
  import { useLoading } from "@/composables/useLoading"

  const router = useRouter()
  const { showToast } = useToast()
  const { startLoading, stopLoading } = useLoading()

  const formData = ref({
    unitNumber: "",
    size: "",
    monthlyRate: "",
    status: "available" as "available" | "occupied" | "overdue",
    building: "",
    unit: "",
    accessInstructions: "",
    description: "",
  })


  const createUnit = async () => {
    startLoading()
    try {
      const payload: Partial<StorageUnit> = {
        unitNumber: formData.value.unitNumber,
        size: formData.value.size,
        monthlyRate: Number(formData.value.monthlyRate),
        status: formData.value.status,
        building: formData.value.building || "",
        accessInstructions: formData.value.accessInstructions || "",
        description: formData.value.description || "",
      }

      await storageService.addUnit(payload)
      showToast("Storage unit created successfully!", "success")
      router.push("/storages")
    } catch  {
      showToast("Failed to create storage unit.", "error")
    } finally {
      stopLoading()
    }
  }
</script>


<style scoped>
.add-storage-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-background);
  color: var(--color-text);
}

.page-header {
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  width: fit-content;
}

.back-link:hover {
  color: var(--color-secondary);
  transform: translateX(-4px);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.page-subtitle {
  color: var(--color-text-light);
  font-size: 1rem;
  margin: 0;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.storage-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border-light);
}

.section-header svg {
  color: var(--color-secondary);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-input-border);
  border-radius: 10px;
  font-size: 1rem;
  color: var(--color-text);
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(22, 64, 249, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-lighter);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.checkbox-card {
  position: relative;
  cursor: pointer;
}

.checkbox-card input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.checkbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--gradient-surface);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.2s;
}

.checkbox-content svg {
  color: var(--color-text-light);
  transition: all 0.2s;
}

.feature-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-light);
  text-align: center;
  transition: all 0.2s;
}

.checkbox-card input[type="checkbox"]:checked + .checkbox-content {
  background: var(--gradient-primary);
  border-color: var(--color-secondary);
}

.checkbox-card input[type="checkbox"]:checked + .checkbox-content svg {
  color: var(--color-secondary);
}

.checkbox-card input[type="checkbox"]:checked + .checkbox-content .feature-name {
  color: var(--color-secondary);
}

.checkbox-card:hover .checkbox-content {
  border-color: var(--color-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}

.btn-secondary,
.btn-primary {
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-text-light);
}

.btn-secondary:hover {
  border-color: var(--color-error);
  color: var(--color-error);
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.preview-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.preview-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border-light);
}

.unit-preview {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-unit-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.preview-status {
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.preview-status.available {
  background: var(--color-available-bg);
  color: var(--color-available);
}

.preview-status.maintenance {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.preview-status.reserved {
  background: var(--color-reserved-bg);
  color: var(--color-reserved);
}

.preview-size {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-light);
  font-size: 0.9375rem;
}

.preview-size svg {
  color: var(--color-secondary);
}

.preview-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--gradient-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.price-label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.preview-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.features-label {
  font-size: 0.875rem;
  color: var(--color-text-light);
  font-weight: 600;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  padding: 0.25rem 0.75rem;
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.preview-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.preview-empty svg {
  color: var(--color-text-disabled);
  margin-bottom: 0.5rem;
}

.preview-empty p {
  color: var(--color-text-lighter);
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .form-container {
    grid-template-columns: 1fr;
  }

  .preview-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .add-storage-container {
    padding: 1rem;
  }

  .form-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}
</style>