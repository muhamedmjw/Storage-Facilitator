import axios from 'axios'
import type { Customer } from '@/types'

const API_URL = 'http://localhost:4000/customers'

export const customerService = {
  async getAll() {
    const response = await axios.get<Customer[]>(API_URL)
    return response.data
  },

  async add(customer: Omit<Customer, 'id'>) {
    const response = await axios.post<Customer>(API_URL, customer)
    return response.data
  },

  async update(id: string, customer: Partial<Customer>) {
    const response = await axios.put<Customer>(`${API_URL}/${id}`, customer)
    return response.data
  },

  async getById(id: string) {
    const response = await axios.get<Customer>(`${API_URL}/${id}`)
    return response.data
  },

  async delete(id: string) {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  }
}
