import { api } from './api'
import type { Customer } from '@/types'

export const customerService = {
  async getAll(): Promise<Customer[]> {
    try {
      const response = await api.get<Customer[]>('/customers')
      return response.data
    } catch (error) {
      console.error('[CustomerService] Error fetching customers:', error)
      throw error
    }
  },

  async getById(id: string): Promise<Customer> {
    try {
      const response = await api.get<Customer>(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error(`[CustomerService] Error fetching customer ${id}:`, error)
      throw error
    }
  },

  async add(customer: Omit<Customer, 'id'>): Promise<Customer> {
    try {
      const response = await api.post<Customer>('/customers', customer)
      return response.data
    } catch (error) {
      console.error('[CustomerService] Error adding customer:', error)
      throw error
    }
  },

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    try {
      const response = await api.put<Customer>(`/customers/${id}`, customer)
      return response.data
    } catch (error) {
      console.error(`[CustomerService] Error updating customer ${id}:`, error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/customers/${id}`)
    } catch (error) {
      console.error(`[CustomerService] Error deleting customer ${id}:`, error)
      throw error
    }
  }
}