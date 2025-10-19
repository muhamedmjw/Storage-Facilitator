/* eslint-disable no-unused-vars */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'staff';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  notes?: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  createdAt: string;
}

export enum UnitStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved'
}

export enum UnitSize {
  SMALL = '5x5',
  MEDIUM = '5x10',
  LARGE = '10x10',
  XLARGE = '10x20'
}

export interface StorageUnit {
  id: string;
  buildingId: string;
  unitNumber: string;
  size: UnitSize;
  price: number;
  status: UnitStatus;
  customerId?: string;
}

export enum PaymentStatus {
  PAID = 'paid',
  OVERDUE = 'overdue'
}

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

export interface Payment {
  id: string;
  rentalId: string;
  amount: number;
  date: string;
  method: 'cash';
  notes?: string;
}

export interface Note {
  id: string;
  customerId: string;
  userId: string;
  content: string;
  createdAt: string;
}