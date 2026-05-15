// LABOCORE Type Definitions

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'manager' | 'viewer';
  avatar?: string;
  department?: string;
}

export interface Sample {
  id: string;
  code: string;
  patientName: string;
  patientId: string;
  type: 'blood' | 'urine' | 'tissue' | 'swab' | 'other';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  collectedAt: string;
  receivedAt: string;
  technicianId?: string;
  technicianName?: string;
  notes?: string;
  tests: string[];
}

export interface Result {
  id: string;
  sampleId: string;
  sampleCode: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  validatedAt?: string;
  validatedBy?: string;
  technicianId: string;
  technicianName: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: 'reagents' | 'consumables' | 'equipment' | 'ppe' | 'other';
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  location: string;
  expirationDate?: string;
  supplierId?: string;
  supplierName?: string;
  lastRestocked?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  rating: number;
  totalOrders: number;
  lastOrderDate?: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialization: string[];
  status: 'active' | 'on-leave' | 'inactive';
  samplesProcessed: number;
  avgProcessingTime: number;
  accuracy: number;
  joinedAt: string;
}

export interface DashboardStats {
  totalSamples: number;
  samplesChange: number;
  pendingSamples: number;
  pendingChange: number;
  completedToday: number;
  completedChange: number;
  avgProcessingTime: number;
  processingTimeChange: number;
  criticalResults: number;
  criticalChange: number;
  lowStockItems: number;
  lowStockChange: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
