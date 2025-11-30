<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Create Payment Transaction</h2>
        <button class="close-btn" @click="$emit('close')">
          <X class="icon" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label>Customer *</label>
          <select v-model="form.customerId" @change="onCustomerChange" required>
            <option value="">Select customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Storage Unit *</label>
          <select 
            v-model="form.storageId" 
            @change="onStorageChange"
            :disabled="!form.customerId || availableStorageUnits.length === 0"
            required
          >
            <option value="">
              {{ !form.customerId 
                ? 'Select a customer first' 
                : availableStorageUnits.length === 0 
                  ? 'No storage units assigned to this customer' 
                  : 'Select storage unit' 
              }}
            </option>
            <option v-for="unit in availableStorageUnits" :key="unit.id" :value="unit.id">
              {{ unit.unitNumber }} - {{ unit.monthlyRate }} IQD/month
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Amount (IQD) *</label>
          <input 
            v-model.number="form.amount" 
            type="number" 
            step="0.01"
            required
            placeholder="Enter amount"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea 
            v-model="form.description"
            rows="3"
            placeholder="Optional payment description..."
          ></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            Create Payment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Customer, StorageUnit } from '@/types'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  customers: Customer[]
  storageUnits: StorageUnit[]
}>()

const emit = defineEmits<{
  close: []
  submit: [form: {
    customerId: string
    storageId: string
    amount: number
    description: string
  }]
}>()

const form = ref({
  customerId: '',
  storageId: '',
  amount: 0,
  description: ''
})

const availableStorageUnits = computed(() => {
  if (!form.value.customerId) return []
  
  const selectedCustomer = props.customers.find(c => c.id === form.value.customerId)
  if (!selectedCustomer) return []
  
  return props.storageUnits.filter(unit => 
    unit.customer === selectedCustomer.name || 
    unit.email === selectedCustomer.email
  )
})

const onCustomerChange = () => {
  form.value.storageId = ''
  form.value.amount = 0
}

const onStorageChange = () => {
  if (form.value.storageId) {
    const selectedUnit = availableStorageUnits.value.find(
      unit => unit.id.toString() === form.value.storageId
    )
    if (selectedUnit) {
      form.value.amount = selectedUnit.monthlyRate
    }
  } else {
    form.value.amount = 0
  }
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
  form.value = {
    customerId: '',
    storageId: '',
    amount: 0,
    description: ''
  }
}
</script>
