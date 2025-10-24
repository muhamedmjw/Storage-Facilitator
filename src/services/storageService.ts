import { api } from "./api";


export interface StorageUnit {
  id: number;
  unitNumber: string;
  size: string;
  status: "available" | "occupied" | "overdue";
  monthlyRate: number;
  building?: string;
  customer?: string;
  startDate?: string;
  nextPayment?: string;
  accessInstructions?: string  // ✅ add this line
  description?: string

}
const getAll = async (): Promise<StorageUnit[]> => {
  const res = await api.get('/storageUnits')
  return res.data
}

export const storageService = {
  getUnits: () => api.get<StorageUnit[]>("/storageUnits"),
  getUnitById: (id: number | string) => api.get<StorageUnit>(`/storageUnits/${id}`),
  addUnit: (data: Partial<StorageUnit>) => api.post("/storageUnits", data),
  updateUnit: (id: number | string, data: Partial<StorageUnit>) =>
    api.put(`/storageUnits/${id}`, data),
  deleteUnit: (id: number | string) => api.delete(`/storageUnits/${id}`),
  
};
