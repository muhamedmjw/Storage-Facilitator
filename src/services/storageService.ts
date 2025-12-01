import { api } from './api'
import type { StorageUnit } from '@/types'

export const storageService = {
  async getUnits(): Promise<StorageUnit[]> {
    try {
      const response = await api.get<StorageUnit[]>('/storageUnits')
      return response.data

    } catch (error) {
      console.error('[StorageService] Error fetching units:', error)
      throw error

    }
  },


  async getUnitById(id: number | string): Promise<StorageUnit> {
    try {
      const response = await api.get<StorageUnit>(`/storageUnits/${id}`)
      return response.data

    } catch (error) {
      console.error(`[StorageService] Error fetching unit ${id}:`, error)
      throw error

    }
  },


  async addUnit(data: Partial<StorageUnit>): Promise<StorageUnit> {
    try {
      const response = await api.post<StorageUnit>('/storageUnits', data)
      return response.data

    } catch (error) {
      console.error('[StorageService] Error adding unit:', error)
      throw error

    }
  },


  async updateUnit(id: number | string, data: Partial<StorageUnit>): Promise<StorageUnit> {
    try {
      const response = await api.put<StorageUnit>(`/storageUnits/${id}`, data)
      return response.data

    } catch (error) {
      console.error(`[StorageService] Error updating unit ${id}:`, error)
      throw error

    }
  },

  
  async deleteUnit(id: number | string): Promise<void> {
    try {
      await api.delete(`/storageUnits/${id}`)

    } catch (error) {
      console.error(`[StorageService] Error deleting unit ${id}:`, error)
      throw error
      
    }
  }
}