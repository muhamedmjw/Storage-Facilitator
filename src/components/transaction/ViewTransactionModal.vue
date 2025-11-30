<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content large" @click.stop>
      <div class="modal-header">
        <div>
          <h2>Payment Details</h2>
          <p class="modal-subtitle">Transaction ID: {{ transaction.id }}</p>
        </div>
        <button class="close-btn" @click="$emit('close')">
          <X class="icon" />
        </button>
      </div>

      <div class="transaction-details-view">
        <!-- QR Code Section -->
        <div v-if="transaction.qrCode && transaction.status === 'UNPAID'" class="qr-section">
          <h3>Scan to Pay</h3>
          <img :src="transaction.qrCode" alt="Payment QR Code" class="qr-code"/>
          <p class="qr-instructions">
            Scan this QR code with the FIB mobile app to complete payment
          </p>
          <div class="readable-code">
            <span class="code-label">Or enter code manually:</span>
            <span class="code-value">{{ transaction.readableCode }}</span>
          </div>
        </div>

        <!-- Transaction Info -->
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Customer</span>
            <span class="info-value">{{ transaction.customerName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Storage Unit</span>
            <span class="info-value">{{ transaction.storageName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Amount</span>
            <span class="info-value amount">{{ transaction.amount }} IQD</span>
          </div>
          <div class="info-item">
            <span class="info-label">Status</span>
            <span :class="['status-badge', transaction.status.toLowerCase()]">
              {{ transaction.status }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">Created</span>
            <span class="info-value">{{ formatDate(transaction.createdAt) }}</span>
          </div>
          <div class="info-item" v-if="transaction.paidAt">
            <span class="info-label">Paid At</span>
            <span class="info-value">{{ formatDate(transaction.paidAt) }}</span>
          </div>
          <div class="info-item" v-if="transaction.validUntil">
            <span class="info-label">Valid Until</span>
            <span class="info-value">{{ formatDate(transaction.validUntil) }}</span>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button 
          v-if="transaction.status === 'UNPAID'" 
          type="button" 
          class="btn-secondary"
          @click="$emit('refresh', transaction)"
        >
          Refresh Status
        </button>
        <button type="button" class="btn-primary" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/types'
import { X } from 'lucide-vue-next'

defineProps<{
  transaction: Transaction
}>()

defineEmits<{
  close: []
  refresh: [transaction: Transaction]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
