import {api} from './api' // ✅ make default import consistent with your api.ts
import type { AxiosResponse } from 'axios'

export interface StorageUnit {
  id: number
  unitNumber: string
  size: string
  status: 'available' | 'occupied' | 'overdue'
  monthlyRate: number
  building?: string
  customer?: string
  startDate?: string
  nextPayment?: string
  accessInstructions?: string
  description?: string
  paymentStatus?: string
  email?: string
  phone?: string
  address?: string
  createdAt?: string
}

// ✅ Cleaned up & fully typed service
export const storageService = {
  getUnits: (): Promise<AxiosResponse<StorageUnit[]>> =>
    api.get('/storageUnits'),

  getUnitById: (id: number | string): Promise<AxiosResponse<StorageUnit>> =>
    api.get(`/storageUnits/${id}`),

  addUnit: (data: Partial<StorageUnit>): Promise<AxiosResponse<StorageUnit>> =>
    api.post('/storageUnits', data),

  updateUnit: (
    id: number | string,
    data: Partial<StorageUnit>
  ): Promise<AxiosResponse<StorageUnit>> =>
    api.put(`/storageUnits/${id}`, data),

  deleteUnit: (id: number | string): Promise<AxiosResponse<void>> =>
    api.delete(`/storageUnits/${id}`),
}
