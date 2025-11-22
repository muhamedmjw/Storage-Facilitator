/* eslint-disable no-unused-vars */

// User 
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'staff' | 'member'; 
}

// Customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  notes?: string;
}

// Building
export interface Building {
  id: string;
  name: string;
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  createdAt: string;
}

// Storage Unit
export type UnitStatus = 'available' | 'occupied' | 'overdue' | 'reserved';

export enum UnitSize {
  SMALL = '5x5',
  MEDIUM = '5x10',
  LARGE = '10x10',
  XLARGE = '10x20'
}

export interface StorageUnit {
  id: number;
  unitNumber: string;
  size: string;
  status: UnitStatus;
  monthlyRate: number;
  building?: string;
  customer?: string;
  startDate?: string;
  nextPayment?: string;
  accessInstructions?: string;
  description?: string;
  paymentStatus?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

// Payment
export enum PaymentStatus {
  PAID = 'paid',
  OVERDUE = 'overdue'
}

export interface Payment {
  id: string;
  rentalId: string;
  amount: number;
  date: string;
  method: 'cash';
  notes?: string;
}

// Transaction Payment (for First Iraqi Bank API)
export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  storageId: string;
  storageName: string;
  amount: number;
  status: 'UNPAID' | 'PAID' | 'DECLINED';
  paymentId?: string;
  readableCode?: string;
  qrCode?: string;
  validUntil?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  customerId: string;
  storageId: string;
  amount: number;
  description?: string;
}

// Rental
export interface Rental {
  id: string;
  unitId: string;
  customerId: string;
  startDate: string;
  endDate?: string;
  monthlyPayment: number;
  paymentStatus: PaymentStatus;
  nextPaymentDue: string;
  notes?: string;
}

// Note
export interface Note {
  id: string;
  customerId: string;
  userId: string;
  content: string;
  createdAt: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Error Interface
export interface ApiError {
  message: string;
  statusCode: number;
}