'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Eye, Edit, Trash2, Truck, Star, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable, PageHeader, StatusBadge, type Column } from '@/components/labocore'
import type { Supplier } from '@/types/labocore'

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'MedSupply Co.',
    contactPerson: 'John Anderson',
    email: 'john@medsupply.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Drive, Boston, MA 02101',
    category: 'Reagents & Test Kits',
    status: 'active',
    rating: 4.8,
    totalOrders: 156,
    lastOrderDate: '2024-01-10',
  },
  {
    id: '2',
    name: 'LabEquip Inc.',
    contactPerson: 'Sarah Miller',
    email: 'sarah@labequip.com',
    phone: '+1 (555) 234-5678',
    address: '456 Equipment Lane, Chicago, IL 60601',
    category: 'Lab Equipment & Consumables',
    status: 'active',
    rating: 4.5,
    totalOrders: 89,
    lastOrderDate: '2024-01-08',
  },
  {
    id: '3',
    name: 'DiagnoTech',
    contactPerson: 'Michael Chen',
    email: 'michael@diagnotech.com',
    phone: '+1 (555) 345-6789',
    address: '789 Tech Boulevard, San Jose, CA 95101',
    category: 'Diagnostic Equipment',
    status: 'active',
    rating: 4.9,
    totalOrders: 42,
    lastOrderDate: '2024-01-05',
  },
  {
    id: '4',
    name: 'SafetyFirst',
    contactPerson: 'Emily Davis',
    email: 'emily@safetyfirst.com',
    phone: '+1 (555) 456-7890',
    address: '321 Safety Street, Atlanta, GA 30301',
    category: 'PPE & Safety Equipment',
    status: 'active',
    rating: 4.3,
    totalOrders: 67,
    lastOrderDate: '2024-01-12',
  },
  {
    id: '5',
    name: 'BioReagents Ltd.',
    contactPerson: 'James Wilson',
    email: 'james@bioreagents.com',
    phone: '+1 (555) 567-8901',
    address: '654 Bio Way, Houston, TX 77001',
    category: 'Reagents & Chemicals',
    status: 'inactive',
    rating: 3.8,
    totalOrders: 23,
    lastOrderDate: '2023-11-15',
  },
  {
    id: '6',
    name: 'PrecisionLab',
    contactPerson: 'Lisa Brown',
    email: 'lisa@precisionlab.com',
    phone: '+1 (555) 678-9012',
    address: '987 Precision Road, Seattle, WA 98101',
    category: 'Calibration & QC',
    status: 'active',
    rating: 4.7,
    totalOrders: 34,
    lastOrderDate: '2024-01-03',
  },
]

function formatDate(dateString?: string): string {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : i < rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

// Calculate stats
const supplierStats = {
  total: mockSuppliers.length,
  active: mockSuppliers.filter(s => s.status === 'active').length,
  avgRating: (mockSuppliers.reduce((acc, s) => acc + s.rating, 0) / mockSuppliers.length).toFixed(1),
  totalOrders: mockSuppliers.reduce((acc, s) => acc + s.totalOrders, 0),
}

export default function SuppliersContent() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: mockSuppliers.length,
  })

  const columns: Column<Supplier>[] = [
    {
      key: 'name',
      label: 'Supplier',
      sortable: true,
      render: (_, item) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.category}</p>
        </div>
      ),
    },
    {
      key: 'contactPerson',
      label: 'Contact',
      render: (_, item) => (
        <div className="space-y-1">
          <p className="text-sm font-medium">{item.contactPerson}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {item.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => (
        <span className="flex items-center gap-1 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          {String(value)}
        </span>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value) => <RatingStars rating={Number(value)} />,
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={String(value)} />,
    },
    {
      key: 'lastOrderDate',
      label: 'Last Order',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-muted-foreground">{formatDate(value as string | undefined)}</span>
      ),
    },
  ]

  const handleDelete = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage supplier relationships and orders"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Enter the details of the new supplier to add them to your network.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="supplierName">Company Name</Label>
                <Input id="supplierName" placeholder="Enter company name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reagents">Reagents & Test Kits</SelectItem>
                      <SelectItem value="equipment">Lab Equipment</SelectItem>
                      <SelectItem value="consumables">Consumables</SelectItem>
                      <SelectItem value="ppe">PPE & Safety</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Full address" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Supplier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{supplierStats.total}</p>
              </div>
              <Truck className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{supplierStats.active}</p>
              </div>
              <Truck className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-warning">{supplierStats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-primary">{supplierStats.totalOrders}</p>
              </div>
              <Truck className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={suppliers}
          selectable
          searchPlaceholder="Search suppliers by name, contact, or category..."
          onSearch={(query) => {
            const filtered = mockSuppliers.filter(
              (s) =>
                s.name.toLowerCase().includes(query.toLowerCase()) ||
                s.contactPerson.toLowerCase().includes(query.toLowerCase()) ||
                s.category.toLowerCase().includes(query.toLowerCase())
            )
            setSuppliers(filtered)
          }}
          actions={(item) => (
            <>
              <DropdownMenuItem className="gap-2">
                <Eye className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Truck className="h-4 w-4" />
                Place Order
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
          pagination={{
            ...pagination,
            onPageChange: (page) => setPagination((p) => ({ ...p, page })),
            onPageSizeChange: (pageSize) => setPagination((p) => ({ ...p, pageSize, page: 1 })),
          }}
        />
      </motion.div>
    </div>
  )
}
