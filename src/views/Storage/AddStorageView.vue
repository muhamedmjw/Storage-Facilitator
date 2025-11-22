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


<style scoped src="../../assets/styles/pages/Storage/AddStorageView.css">

</style>