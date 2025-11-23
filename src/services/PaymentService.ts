import { api } from './api'
import type { Transaction, CreateTransactionRequest } from '@/types'

// FIB Payment API Configuration
const FIB_CONFIG = {
  baseURL: 'https://fib.stage.fib.iq', // Testing environment URL
  clientId: 'YOUR_CLIENT_ID_HERE', // Need to get it from FIB for OAuth2
  clientSecret: 'YOUR_CLIENT_SECRET_HERE', // Need to get it from FIB for OAuth2
  grantType: 'client_credentials', // OAuth2 grant type 
  useMockMode: true  // Set to true to enable mock mode for testing
}

// Token cache
let accessToken: string | null = null
let tokenExpiry: number | null = null


function generateMockQRCode(code: string): string {
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="20" y="20" width="30" height="30" fill="black"/>
      <rect x="60" y="20" width="30" height="30" fill="black"/>
      <rect x="100" y="20" width="30" height="30" fill="black"/>
      <rect x="140" y="20" width="30" height="30" fill="black"/>

      <rect x="20" y="60" width="30" height="30" fill="black"/>
      <rect x="60" y="60" width="30" height="30" fill="black"/>
      <rect x="100" y="60" width="30" height="30" fill="black"/>
      <rect x="140" y="60" width="30" height="30" fill="black"/>

      <rect x="20" y="100" width="30" height="30" fill="black"/>
      <rect x="60" y="100" width="30" height="30" fill="black"/>
      <rect x="100" y="100" width="30" height="30" fill="black"/>
      <rect x="140" y="100" width="30" height="30" fill="black"/>

      <rect x="20" y="140" width="30" height="30" fill="black"/>
      <rect x="60" y="140" width="30" height="30" fill="black"/>
      <rect x="100" y="140" width="30" height="30" fill="black"/>
      <rect x="140" y="140" width="30" height="30" fill="black"/>
      <text x="100" y="190" text-anchor="middle" font-size="12" fill="black">${code}</text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`

    //   fibData = await fibRequest('/payments', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     monetaryValue: { amount: "150.00", currency: 'IQD' },
    //     description: 'Storage rent payment'
    //   })
    // }) 
}

function generatePaymentCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  const part1 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  const part2 = Array(3).fill(0).map(() => numbers[Math.floor(Math.random() * numbers.length)]).join('')
  const part3 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  const part4 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  
  return `${part1}-${part2}-${part3}-${part4}`
}

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken ?? ''
  }

  try {
    const authURL = `${FIB_CONFIG.baseURL}/auth/realms/fib-online-shop/protocol/openid-connect/token`
    
    const response = await fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: FIB_CONFIG.grantType,
        client_id: FIB_CONFIG.clientId,
        client_secret: FIB_CONFIG.clientSecret
      })
    })

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`)
    }

    const data = await response.json()
    accessToken = data.access_token
    tokenExpiry = Date.now() + (data.expires_in - 300) * 1000

    return accessToken || ''
  } catch (error) {
    console.error('[PaymentService] Authentication error:', error)
    throw new Error('Failed to authenticate with FIB payment system')
  }
}

async function fibRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const token = await getAccessToken()
    const url = `${FIB_CONFIG.baseURL}/protected/v1${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`FIB API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[PaymentService] FIB API error:', error)
    throw error
  }
}

export const paymentService = {
  async createPayment(request: CreateTransactionRequest): Promise<Transaction> {
    try {
      let fibData: any

      if (FIB_CONFIG.useMockMode) {
        // MOCK MODE - Generate fake payment data
        console.log('[PaymentService] Running in MOCK mode')
        
        const paymentCode = generatePaymentCode()
        const validUntil = new Date()
        validUntil.setDate(validUntil.getDate() + 1)

        fibData = {
          paymentId: `mock_pay_${Date.now()}`,
          readableCode: paymentCode,
          qrCode: generateMockQRCode(paymentCode),
          validUntil: validUntil.toISOString()
        }
      } else {
        // REAL MODE - Call actual FIB API
        fibData = await fibRequest<any>('/payments', {
          method: 'POST',
          body: JSON.stringify({
            monetaryValue: {
              amount: request.amount.toFixed(2),
              currency: 'IQD'
            },
            description: request.description || 'Storage rent payment',
            statusCallbackUrl: `${window.location.origin}/api/payment-callback`
          })
        })
      }

      // Create transaction record in database
      const transaction: Omit<Transaction, 'id'> = {
        customerId: request.customerId,
        customerName: '',
        storageId: request.storageId,
        storageName: '',
        amount: request.amount,
        status: 'UNPAID',
        paymentId: fibData.paymentId,
        readableCode: fibData.readableCode,
        qrCode: fibData.qrCode,
        validUntil: fibData.validUntil,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const response = await api.post<Transaction>('/transactions', transaction)
      return response.data
    } catch (error) {
      console.error('[PaymentService] Create payment error:', error)
      throw error
    }
  },

  async checkPaymentStatus(paymentId: string): Promise<string> {
    try {
      if (FIB_CONFIG.useMockMode) {
        console.log('[PaymentService] Mock: Checking payment status')
        return Math.random() > 0.5 ? 'PAID' : 'UNPAID'
      }

      const data = await fibRequest<any>(`/payments/${paymentId}/status`, {
        method: 'GET'
      })
      return data.status
    } catch (error) {
      console.error('[PaymentService] Check status error:', error)
      throw error
    }
  },

  async cancelPayment(paymentId: string): Promise<void> {
    try {
      if (FIB_CONFIG.useMockMode) {
        console.log('[PaymentService] Mock: Payment cancelled:', paymentId)
        return
      }

      await fibRequest(`/payments/${paymentId}/cancel`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('[PaymentService] Cancel payment error:', error)
      throw error
    }
  },

  async getAll(): Promise<Transaction[]> {
    try {
      const response = await api.get<Transaction[]>('/transactions')
      return response.data
    } catch (error) {
      console.error('[PaymentService] Error fetching transactions:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Transaction> {
    try {
      const response = await api.get<Transaction>(`/transactions/${id}`)
      return response.data
    } catch (error) {
      console.error(`[PaymentService] Error fetching transaction ${id}:`, error)
      throw error
    }
  },

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    try {
      const response = await api.patch<Transaction>(`/transactions/${id}`, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      return response.data
    } catch (error) {
      console.error(`[PaymentService] Error updating transaction ${id}:`, error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`)
    } catch (error) {
      console.error(`[PaymentService] Error deleting transaction ${id}:`, error)
      throw error
    }
  }
}