<template>
  <div class="transaction-card" @click="$emit('view', transaction)">
    <div class="transaction-header">
      <div class="transaction-info">
        <h3 class="customer-name">{{ transaction.customerName || 'Loading...' }}</h3>
        <p class="storage-info">{{ transaction.storageName || 'Unit Info' }}</p>
      </div>
      <div :class="['status-badge', transaction.status.toLowerCase()]">
        {{ transaction.status }}
      </div>
    </div>

    <div class="transaction-body">
      <div class="transaction-details">
        <div class="detail-item">
          <span class="detail-label">Amount:</span>
          <span class="detail-value amount">{{ transaction.amount.toFixed(2) }} IQD</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Created:</span>
          <span class="detail-value">{{ formatDate(transaction.createdAt) }}</span>
        </div>
        <div class="detail-item" v-if="transaction.paidAt">
          <span class="detail-label">Paid At:</span>
          <span class="detail-value">{{ formatDate(transaction.paidAt) }}</span>
        </div>
        <div class="detail-item" v-if="transaction.readableCode">
          <span class="detail-label">Payment Code:</span>
          <span class="detail-value code">{{ transaction.readableCode }}</span>
        </div>
      </div>
    </div>

    <div class="transaction-actions">
      <button 
        v-if="transaction.status === 'UNPAID'" 
        class="action-btn primary"
        @click.stop="$emit('refresh', transaction)"
      >
        <RotateCcw class="icon" />
        Refresh Status
      </button>
      <button 
        v-if="transaction.status === 'UNPAID'" 
        class="action-btn secondary"
        @click.stop="$emit('cancel', transaction)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types'
import { RotateCcw } from 'lucide-vue-next'

defineProps<{
  transaction: Transaction
}>()

defineEmits<{
  view: [transaction: Transaction]
  refresh: [transaction: Transaction]
  cancel: [transaction: Transaction]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
