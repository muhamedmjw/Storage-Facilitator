import { api } from './api'
import type { Transaction, CreateTransactionRequest } from '@/types'

// CORS Proxy to bypass browser restrictions
const CORS_PROXY = 'https://corsproxy.io/?'

// FIB Payment API Configuration
const FIB_CONFIG = {
  baseURL: import.meta.env.VITE_FIB_BASE_URL || 'https://fib.stage.fib.iq',
  clientId: import.meta.env.VITE_FIB_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_FIB_CLIENT_SECRET || '',
  grantType: 'client_credentials'
}

// Token cache
let accessToken: string | null = null
let tokenExpiry: number | null = null

async function getAccessToken(): Promise<string> {
  // Return cached token if valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken ?? ''
  }

  try {
    // {CORS_PROXY}: Using CORS proxy to bypass browser restrictions by adding CORS headers
    // URL-encodes the FIB base URL so it can be safely passed as a query parameter to the CORS proxy.
    const authURL = `${CORS_PROXY}${encodeURIComponent(FIB_CONFIG.baseURL)}/auth/realms/fib-online-shop/protocol/openid-connect/token`
    
    console.log('[PaymentService] Attempting authentication...')
    
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

    console.log('[PaymentService] Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[PaymentService] Error response:', errorText)
      throw new Error(`Authentication failed: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('[PaymentService] Authentication successful!')
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
    const url = `${CORS_PROXY}${encodeURIComponent(FIB_CONFIG.baseURL)}/protected/v1${endpoint}`

    console.log('[PaymentService] Making FIB request to:', endpoint)

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[PaymentService] FIB API error response:', errorText)
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
      console.log('[PaymentService] Creating payment...')
      
      const fibData = await fibRequest<any>('/payments', {
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
      
      console.log('[PaymentService] Payment created:', fibData)

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
      const token = await getAccessToken()
      const url = `${CORS_PROXY}${encodeURIComponent(FIB_CONFIG.baseURL)}/protected/v1/payments/${paymentId}/cancel`

      console.log('[PaymentService] Cancelling payment:', paymentId)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[PaymentService] Cancel error response:', errorText)
        throw new Error(`Cancel payment failed: ${response.statusText}`)
      }

      // Don't try to parse JSON - the cancel endpoint returns empty response
      console.log('[PaymentService] Payment cancelled successfully')
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