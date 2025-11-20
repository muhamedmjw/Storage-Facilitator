import axios from 'axios'
import type { Transaction, CreateTransactionRequest } from '@/types'

class PaymentService {
  private mockMode = true // Set to false when you have real credentials

  // Mock: Generate random payment code
  private generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const segments = []
    for (let i = 0; i < 3; i++) {
      let segment = ''
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      segments.push(segment)
    }
    return segments.join('-')
  }

  // Mock: Generate random payment ID
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Create payment with FIB (Mock version)
  async createPayment(_data: CreateTransactionRequest): Promise<any> {
    if (this.mockMode) {
      // Mock response simulating FIB API
      return {
        paymentId: this.generateId(),
        readableCode: this.generateCode(),
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        personalAppLink: 'https://personal.stage.first-iraqi-bank.co/?payment=' + this.generateId(),
        businessAppLink: 'https://business.stage.first-iraqi-bank.co/?payment=' + this.generateId(),
        corporateAppLink: 'https://corporate.stage.first-iraqi-bank.co/?payment=' + this.generateId()
      }
    }

    // Real API call (when you have credentials)
    // await this.authorize()
    // const response = await this.api.post('/protected/v1/payments', {...})
    // return response.data
  }

  // Check payment status (Mock version)
  async checkStatus(paymentId: string): Promise<any> {
    if (this.mockMode) {
      // Mock: randomly return PAID or UNPAID for demo
      const statuses = ['PAID', 'UNPAID', 'UNPAID', 'UNPAID'] // 25% chance PAID
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      return {
        paymentId: paymentId,
        status: status,
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        paidAt: status === 'PAID' ? new Date().toISOString() : null,
        amount: {
          amount: '1000',
          currency: 'IQD'
        }
      }
    }

    // Real API call
    // await this.authorize()
    // const response = await this.api.get(`/protected/v1/payments/${paymentId}/status`)
    // return response.data
  }

  // Cancel payment (Mock version)
  async cancelPayment(paymentId: string): Promise<void> {
    if (this.mockMode) {
      // Mock: simulate successful cancellation
      console.log('Mock: Payment cancelled:', paymentId)
      return
    }

    // Real API call
    // await this.authorize()
    // await this.api.post(`/protected/v1/payments/${paymentId}/cancel`)
  }

  // Refund payment (Mock version)
  async refundPayment(paymentId: string): Promise<void> {
    if (this.mockMode) {
      // Mock: simulate successful refund
      console.log('Mock: Payment refunded:', paymentId)
      return
    }

    // Real API call
    // await this.authorize()
    // await this.api.post(`/protected/v1/payments/${paymentId}/refund`)
  }

  // Get all transactions from local db
  async getAll(): Promise<Transaction[]> {
    try {
      const response = await axios.get('http://localhost:3000/transactions')
      return response.data
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }

  // Save transaction locally
  async save(transaction: Transaction): Promise<Transaction> {
    const response = await axios.post('http://localhost:3000/transactions', transaction)
    return response.data
  }

  // Update transaction
  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const response = await axios.patch(`http://localhost:3000/transactions/${id}`, {
      ...data,
      updatedAt: new Date().toISOString()
    })
    return response.data
  }

  // Delete transaction
  async delete(id: string): Promise<void> {
    await axios.delete(`http://localhost:3000/transactions/${id}`)
  }
}

export const paymentService = new PaymentService()