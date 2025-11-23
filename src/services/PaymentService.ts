// import { api } from './api'
// import type { Transaction, CreateTransactionRequest } from '@/types'

// // FIB Payment API Configuration
// const FIB_CONFIG = {
//   baseURL: 'https://fib.stage.fib.iq',
//   clientId: 'YOUR_CLIENT_ID_HERE',
//   clientSecret: 'YOUR_CLIENT_SECRET_HERE',
//   grantType: 'client_credentials'
// }

// // Token cache
// let accessToken: string | null = null
// let tokenExpiry: number | null = null


// // Get OAuth2 access token from FIB
// async function getAccessToken(): Promise<string> {
//   // Return cached token if still valid
//   if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
//     return accessToken ?? ''
//   }

//   try {
//     const authURL = `${FIB_CONFIG.baseURL}/auth/realms/fib-online-shop/protocol/openid-connect/token`
    
//     const response = await fetch(authURL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams({
//         grant_type: FIB_CONFIG.grantType,
//         client_id: FIB_CONFIG.clientId,
//         client_secret: FIB_CONFIG.clientSecret
//       })
//     })

//     if (!response.ok) {
//       throw new Error(`Authentication failed: ${response.statusText}`)
//     }

//     const data = await response.json()
//     accessToken = data.access_token
//     // Set expiry to 5 minutes before actual expiry for safety
//     tokenExpiry = Date.now() + (data.expires_in - 300) * 1000

//     return accessToken ?? ''
//   } catch (error) {
//     console.error('[PaymentService] Authentication error:', error)
//     throw new Error('Failed to authenticate with FIB payment system')
//   }
// }


// // Make authenticated request to FIB API
// async function fibRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
//   try {
//     const token = await getAccessToken()
//     const url = `${FIB_CONFIG.baseURL}/protected/v1${endpoint}`

//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         ...options.headers
//       }
//     })

//     if (!response.ok) {
//       throw new Error(`FIB API error: ${response.statusText}`)
//     }

//     return await response.json()
//   } catch (error) {
//     console.error('[PaymentService] FIB API error:', error)
//     throw error
//   }
// }

// export const paymentService = {
//   async createPayment(request: CreateTransactionRequest): Promise<Transaction> {
//     try {
//       // Create payment in FIB system
//       const fibData = await fibRequest<any>('/payments', {
//         method: 'POST',
//         body: JSON.stringify({
//           monetaryValue: {
//             amount: request.amount.toFixed(2),
//             currency: 'IQD'
//           },
//           description: request.description || 'Storage rent payment',
//           statusCallbackUrl: `${window.location.origin}/api/payment-callback`
//         })
//       })

//       // Create transaction record in our database
//       const transaction: Omit<Transaction, 'id'> = {
//         customerId: request.customerId,
//         customerName: '',
//         storageId: request.storageId,
//         storageName: '',
//         amount: request.amount,
//         status: 'UNPAID',
//         paymentId: fibData.paymentId,
//         readableCode: fibData.readableCode,
//         qrCode: fibData.qrCode,
//         validUntil: fibData.validUntil,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }

//       const response = await api.post<Transaction>('/transactions', transaction)
//       return response.data
//     } catch (error) {
//       console.error('[PaymentService] Create payment error:', error)
//       throw error
//     }
//   },

//   async checkPaymentStatus(paymentId: string): Promise<string> {
//     try {
//       const data = await fibRequest<any>(`/payments/${paymentId}/status`, {
//         method: 'GET'
//       })
//       return data.status
//     } catch (error) {
//       console.error('[PaymentService] Check status error:', error)
//       throw error
//     }
//   },

//   async cancelPayment(paymentId: string): Promise<void> {
//     try {
//       await fibRequest(`/payments/${paymentId}/cancel`, {
//         method: 'POST'
//       })
//     } catch (error) {
//       console.error('[PaymentService] Cancel payment error:', error)
//       throw error
//     }
//   },

//   async getAll(): Promise<Transaction[]> {
//     try {
//       const response = await api.get<Transaction[]>('/transactions')
//       return response.data
//     } catch (error) {
//       console.error('[PaymentService] Error fetching transactions:', error)
//       throw error
//     }
//   },

//   async getById(id: string): Promise<Transaction> {
//     try {
//       const response = await api.get<Transaction>(`/transactions/${id}`)
//       return response.data
//     } catch (error) {
//       console.error(`[PaymentService] Error fetching transaction ${id}:`, error)
//       throw error
//     }
//   },

//   async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
//     try {
//       const response = await api.patch<Transaction>(`/transactions/${id}`, {
//         ...data,
//         updatedAt: new Date().toISOString()
//       })
//       return response.data
//     } catch (error) {
//       console.error(`[PaymentService] Error updating transaction ${id}:`, error)
//       throw error
//     }
//   },

//   async delete(id: string): Promise<void> {
//     try {
//       await api.delete(`/transactions/${id}`)
//     } catch (error) {
//       console.error(`[PaymentService] Error deleting transaction ${id}:`, error)
//       throw error
//     }
//   }
// }



import { api } from './api'
import type { Transaction, CreateTransactionRequest } from '@/types'

// FIB Payment API Configuration
const FIB_CONFIG = {
  baseURL: 'https://fib.stage.fib.iq',
  clientId: 'YOUR_CLIENT_ID_HERE',
  clientSecret: 'YOUR_CLIENT_SECRET_HERE',
  grantType: 'client_credentials',
  useMockMode: true  // Set to false when you have real credentials
}

// Token cache
let accessToken: string | null = null
let tokenExpiry: number | null = null

/**
 * Generate mock QR code (base64 image)
 */
function generateMockQRCode(code: string): string {
  // Simple SVG QR code placeholder
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
}

/**
 * Generate random 12-digit payment code (format: XXX-XXX-XXX-XXX)
 */
function generatePaymentCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  // Generate 4 parts of 3 characters each (12 total)
  const part1 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  const part2 = Array(3).fill(0).map(() => numbers[Math.floor(Math.random() * numbers.length)]).join('')
  const part3 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  const part4 = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
  
  return `${part1}-${part2}-${part3}-${part4}`
}

/**
 * Get OAuth2 access token from FIB
 */
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
    // Set expiry to 5 minutes before actual expiry for safety
    tokenExpiry = Date.now() + (data.expires_in - 300) * 1000

    return accessToken || ''
  } catch (error) {
    console.error('[PaymentService] Authentication error:', error)
    throw new Error('Failed to authenticate with FIB payment system')
  }
}

/**
 * Make authenticated request to FIB API
 */
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
  /**
   * Create a new payment transaction
   */
  async createPayment(request: CreateTransactionRequest): Promise<Transaction> {
    try {
      let fibData: any

      // MOCK MODE - Use when credentials not available
      if (FIB_CONFIG.useMockMode) {
        console.log('[PaymentService] Running in MOCK mode - no real API calls')
        
        const paymentCode = generatePaymentCode()
        const validUntil = new Date()
        validUntil.setDate(validUntil.getDate() + 1) // Valid for 24 hours

        fibData = {
          paymentId: `mock_pay_${Date.now()}`,
          readableCode: paymentCode,
          qrCode: generateMockQRCode(paymentCode),
          validUntil: validUntil.toISOString()
        }
      } 
      // REAL MODE - Use when you have credentials
      else {
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

      // Create transaction record in our database
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

  /**
   * Check payment status from FIB
   */
  async checkPaymentStatus(paymentId: string): Promise<string> {
    try {
      // MOCK MODE
      if (FIB_CONFIG.useMockMode) {
        console.log('[PaymentService] Mock: Simulating payment status check')
        // Randomly return PAID or UNPAID for demo
        return Math.random() > 0.5 ? 'PAID' : 'UNPAID'
      }

      // REAL MODE
      const data = await fibRequest<any>(`/payments/${paymentId}/status`, {
        method: 'GET'
      })
      return data.status
    } catch (error) {
      console.error('[PaymentService] Check status error:', error)
      throw error
    }
  },

  /**
   * Cancel a payment
   */
  async cancelPayment(paymentId: string): Promise<void> {
    try {
      // MOCK MODE
      if (FIB_CONFIG.useMockMode) {
        console.log('[PaymentService] Mock: Payment cancelled:', paymentId)
        return
      }

      // REAL MODE
      await fibRequest(`/payments/${paymentId}/cancel`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('[PaymentService] Cancel payment error:', error)
      throw error
    }
  },

  /**
   * Get all transactions from database
   */
  async getAll(): Promise<Transaction[]> {
    try {
      const response = await api.get<Transaction[]>('/transactions')
      return response.data
    } catch (error) {
      console.error('[PaymentService] Error fetching transactions:', error)
      throw error
    }
  },

  /**
   * Get transaction by ID
   */
  async getById(id: string): Promise<Transaction> {
    try {
      const response = await api.get<Transaction>(`/transactions/${id}`)
      return response.data
    } catch (error) {
      console.error(`[PaymentService] Error fetching transaction ${id}:`, error)
      throw error
    }
  },

  /**
   * Update transaction in database
   */
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

  /**
   * Delete transaction from database
   */
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`)
    } catch (error) {
      console.error(`[PaymentService] Error deleting transaction ${id}:`, error)
      throw error
    }
  }
}