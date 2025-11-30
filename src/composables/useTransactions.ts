import { ref, computed } from 'vue'
import { paymentService } from '@/services/PaymentService'
import { customerService } from '@/services/customerService'
import { storageService } from '@/services/storageService'
import type { Transaction, Customer, StorageUnit } from '@/types'
import { useToast } from '@/composables/useToast'
import { useLoading } from '@/composables/useLoading'

export function useTransactions() {
  const { showToast } = useToast()
  const { startLoading, stopLoading } = useLoading()

  const transactions = ref<Transaction[]>([])
  const customers = ref<Customer[]>([])
  const storageUnits = ref<StorageUnit[]>([])
  const filterStatus = ref('All')

  const filteredTransactions = computed(() => {
    if (filterStatus.value === 'All') {
      return transactions.value
    }
    return transactions.value.filter(t => t.status === filterStatus.value)
  })

  const getCountByStatus = (status: string) => {
    if (status === 'All') return transactions.value.length
    return transactions.value.filter(t => t.status === status).length
  }

  const loadData = async () => {
    startLoading()
    try {
      const [transactionsData, customersData, unitsData] = await Promise.all([
        paymentService.getAll(),
        customerService.getAll(),
        storageService.getUnits()
      ])
      
      transactions.value = transactionsData
      customers.value = customersData
      storageUnits.value = unitsData
      
      showToast('Data loaded successfully', 'success')
    } catch (error) {
      console.error('Failed to load data:', error)
      showToast('Failed to load data', 'error')
    } finally {
      stopLoading()
    }
  }

  const checkPaymentStatus = async (transaction: Transaction) => {
    startLoading()
    try {
      const status = await paymentService.checkPaymentStatus(transaction.paymentId!)
      
      const updated = await paymentService.update(transaction.id, {
        status: status as "UNPAID" | "PAID" | "DECLINED",
        paidAt: status === 'PAID' ? new Date().toISOString() : undefined
      })
      
      const index = transactions.value.findIndex(t => t.id === transaction.id)
      if (index !== -1) {
        transactions.value[index] = updated
      }
      
      showToast(`Payment status: ${status}`, status === 'PAID' ? 'success' : 'info')
      return updated
    } catch (error) {
      console.error('Failed to check status:', error)
      showToast('Failed to check payment status', 'error')
      throw error
    } finally {
      stopLoading()
    }
  }

  const cancelTransaction = async (transaction: Transaction) => {
    if (!confirm('Are you sure you want to cancel this payment?')) return null
    
    startLoading()
    try {
      if (transaction.paymentId) {
        await paymentService.cancelPayment(transaction.paymentId)
      }
      
      const updated = await paymentService.update(transaction.id, { status: 'DECLINED' })
      
      const index = transactions.value.findIndex(t => t.id === transaction.id)
      if (index !== -1) {
        transactions.value[index] = updated
      }
      
      showToast('Payment cancelled successfully', 'success')
      return updated
    } catch (error) {
      console.error('Failed to cancel payment:', error)
      showToast('Failed to cancel payment', 'error')
      throw error
    } finally {
      stopLoading()
    }
  }

  return {
    transactions,
    customers,
    storageUnits,
    filterStatus,
    filteredTransactions,
    getCountByStatus,
    loadData,
    checkPaymentStatus,
    cancelTransaction
  }
}
