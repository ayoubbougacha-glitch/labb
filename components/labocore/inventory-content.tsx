'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Eye, Edit, Trash2, Package, AlertTriangle, ShoppingCart } from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DataTable, PageHeader, StatusBadge, type Column } from '@/components/labocore'
import type { InventoryItem } from '@/types/labocore'

// Mock data
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Hemoglobin A1c Test Kit',
    sku: 'HBA1C-100',
    category: 'reagents',
    quantity: 15,
    unit: 'kits',
    minStock: 20,
    maxStock: 100,
    location: 'Shelf A-1',
    expirationDate: '2024-06-15',
    supplierName: 'MedSupply Co.',
    status: 'low-stock',
  },
  {
    id: '2',
    name: 'Blood Collection Tubes (EDTA)',
    sku: 'BCT-EDTA-500',
    category: 'consumables',
    quantity: 250,
    unit: 'units',
    minStock: 100,
    maxStock: 500,
    location: 'Shelf B-2',
    expirationDate: '2025-01-20',
    supplierName: 'LabEquip Inc.',
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'Glucose Test Strips',
    sku: 'GTS-200',
    category: 'reagents',
    quantity: 0,
    unit: 'boxes',
    minStock: 10,
    maxStock: 50,
    location: 'Shelf A-3',
    supplierName: 'DiagnoTech',
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Nitrile Gloves (Medium)',
    sku: 'NG-M-1000',
    category: 'ppe',
    quantity: 450,
    unit: 'pairs',
    minStock: 200,
    maxStock: 1000,
    location: 'Cabinet C-1',
    supplierName: 'SafetyFirst',
    status: 'in-stock',
  },
  {
    id: '5',
    name: 'Microscope Slides',
    sku: 'MS-72',
    category: 'consumables',
    quantity: 180,
    unit: 'boxes',
    minStock: 50,
    maxStock: 300,
    location: 'Shelf D-1',
    supplierName: 'LabEquip Inc.',
    status: 'in-stock',
  },
  {
    id: '6',
    name: 'Urine Analysis Strips',
    sku: 'UAS-100',
    category: 'reagents',
    quantity: 5,
    unit: 'bottles',
    minStock: 10,
    maxStock: 40,
    location: 'Shelf A-2',
    expirationDate: '2024-03-01',
    supplierName: 'MedSupply Co.',
    status: 'expired',
  },
  {
    id: '7',
    name: 'Centrifuge Tubes (15ml)',
    sku: 'CT-15-500',
    category: 'consumables',
    quantity: 320,
    unit: 'units',
    minStock: 100,
    maxStock: 500,
    location: 'Shelf B-1',
    supplierName: 'LabEquip Inc.',
    status: 'in-stock',
  },
  {
    id: '8',
    name: 'Lab Coats (Large)',
    sku: 'LC-L-20',
    category: 'ppe',
    quantity: 18,
    unit: 'pieces',
    minStock: 15,
    maxStock: 50,
    location: 'Cabinet C-2',
    supplierName: 'SafetyFirst',
    status: 'low-stock',
  },
]

const categoryLabels: Record<string, string> = {
  reagents: 'Reagents',
  consumables: 'Consumables',
  equipment: 'Equipment',
  ppe: 'PPE',
  other: 'Other',
}

function formatDate(dateString?: string): string {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Calculate stats
const inventoryStats = {
  totalItems: mockInventory.length,
  lowStock: mockInventory.filter(i => i.status === 'low-stock').length,
  outOfStock: mockInventory.filter(i => i.status === 'out-of-stock').length,
  expired: mockInventory.filter(i => i.status === 'expired').length,
}

export default function InventoryContent() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: mockInventory.length,
  })

  const columns: Column<InventoryItem>[] = [
    {
      key: 'name',
      label: 'Item',
      sortable: true,
      render: (_, item) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="capitalize text-sm">{categoryLabels[String(value)] || value}</span>
      ),
    },
    {
      key: 'quantity',
      label: 'Stock Level',
      render: (_, item) => {
        const percentage = (item.quantity / item.maxStock) * 100
        return (
          <div className="w-32">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">{item.quantity}</span>
              <span className="text-muted-foreground text-xs">/ {item.maxStock} {item.unit}</span>
            </div>
            <Progress 
              value={percentage} 
              className={`h-1.5 ${
                percentage <= 20 ? '[&>div]:bg-destructive' :
                percentage <= 40 ? '[&>div]:bg-warning' :
                '[&>div]:bg-success'
              }`}
            />
          </div>
        )
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={String(value)} />,
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (
        <span className="text-sm font-mono">{String(value)}</span>
      ),
    },
    {
      key: 'expirationDate',
      label: 'Expires',
      sortable: true,
      render: (value, item) => {
        const isExpired = item.status === 'expired'
        const isExpiringSoon = value && new Date(String(value)) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        return (
          <span className={`text-sm ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-warning' : 'text-muted-foreground'}`}>
            {formatDate(value as string | undefined)}
          </span>
        )
      },
    },
    {
      key: 'supplierName',
      label: 'Supplier',
      render: (value) => (
        <span className="text-sm">{value ? String(value) : '-'}</span>
      ),
    },
  ]

  const handleDelete = (id: string) => {
    setInventory((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Manage laboratory supplies and equipment"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>
                Add a new item to the inventory tracking system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="ABC-123" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reagents">Reagents</SelectItem>
                      <SelectItem value="consumables">Consumables</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="ppe">PPE</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Shelf A-1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input id="minStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input id="maxStock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration">Expiration Date</Label>
                <Input id="expiration" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Item
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
                <p className="text-xs text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{inventoryStats.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-warning">{inventoryStats.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{inventoryStats.outOfStock}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-destructive">{inventoryStats.expired}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/50" />
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
          data={inventory}
          selectable
          searchPlaceholder="Search inventory by name, SKU, or category..."
          onSearch={(query) => {
            const filtered = mockInventory.filter(
              (i) =>
                i.name.toLowerCase().includes(query.toLowerCase()) ||
                i.sku.toLowerCase().includes(query.toLowerCase()) ||
                i.category.toLowerCase().includes(query.toLowerCase())
            )
            setInventory(filtered)
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
                <ShoppingCart className="h-4 w-4" />
                Reorder
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
