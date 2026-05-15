'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Eye, Edit, Trash2, FlaskConical } from 'lucide-react'
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
import { DataTable, PageHeader, StatusBadge, PriorityIndicator, type Column } from '@/components/labocore'
import type { Sample } from '@/types/labocore'

// Mock data
const mockSamples: Sample[] = [
  {
    id: '1',
    code: 'BL-2024-0892',
    patientName: 'John Smith',
    patientId: 'P-10234',
    type: 'blood',
    status: 'pending',
    priority: 'urgent',
    collectedAt: '2024-01-15T08:30:00Z',
    receivedAt: '2024-01-15T09:15:00Z',
    technicianName: 'Dr. Sarah Chen',
    tests: ['CBC', 'Lipid Panel', 'HbA1c'],
    notes: 'Fasting sample',
  },
  {
    id: '2',
    code: 'UR-2024-0891',
    patientName: 'Jane Doe',
    patientId: 'P-10235',
    type: 'urine',
    status: 'in-progress',
    priority: 'normal',
    collectedAt: '2024-01-15T07:45:00Z',
    receivedAt: '2024-01-15T08:30:00Z',
    technicianName: 'James Wilson',
    tests: ['Urinalysis', 'Culture'],
    notes: '',
  },
  {
    id: '3',
    code: 'BL-2024-0890',
    patientName: 'Robert Wilson',
    patientId: 'P-10236',
    type: 'blood',
    status: 'completed',
    priority: 'high',
    collectedAt: '2024-01-15T06:00:00Z',
    receivedAt: '2024-01-15T06:45:00Z',
    technicianName: 'Maria Garcia',
    tests: ['Thyroid Panel'],
    notes: '',
  },
  {
    id: '4',
    code: 'SW-2024-0889',
    patientName: 'Emily Brown',
    patientId: 'P-10237',
    type: 'swab',
    status: 'completed',
    priority: 'normal',
    collectedAt: '2024-01-14T15:00:00Z',
    receivedAt: '2024-01-14T16:00:00Z',
    technicianName: 'David Kim',
    tests: ['Strep Test'],
    notes: 'Throat swab',
  },
  {
    id: '5',
    code: 'TI-2024-0888',
    patientName: 'Michael Davis',
    patientId: 'P-10238',
    type: 'tissue',
    status: 'pending',
    priority: 'high',
    collectedAt: '2024-01-14T14:00:00Z',
    receivedAt: '2024-01-14T14:30:00Z',
    technicianName: 'Dr. Sarah Chen',
    tests: ['Histopathology'],
    notes: 'Biopsy sample',
  },
  {
    id: '6',
    code: 'BL-2024-0887',
    patientName: 'Sarah Johnson',
    patientId: 'P-10239',
    type: 'blood',
    status: 'in-progress',
    priority: 'normal',
    collectedAt: '2024-01-14T13:00:00Z',
    receivedAt: '2024-01-14T13:45:00Z',
    technicianName: 'James Wilson',
    tests: ['CBC', 'BMP'],
    notes: '',
  },
  {
    id: '7',
    code: 'UR-2024-0886',
    patientName: 'William Taylor',
    patientId: 'P-10240',
    type: 'urine',
    status: 'cancelled',
    priority: 'low',
    collectedAt: '2024-01-14T10:00:00Z',
    receivedAt: '2024-01-14T11:00:00Z',
    tests: ['Drug Screen'],
    notes: 'Sample compromised',
  },
]

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const sampleTypeLabels: Record<string, string> = {
  blood: 'Blood',
  urine: 'Urine',
  tissue: 'Tissue',
  swab: 'Swab',
  other: 'Other',
}

export default function SamplesContent() {
  const [samples, setSamples] = useState<Sample[]>(mockSamples)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: mockSamples.length,
  })

  const columns: Column<Sample>[] = [
    {
      key: 'code',
      label: 'Sample Code',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-medium">{String(value)}</span>
      ),
    },
    {
      key: 'patientName',
      label: 'Patient',
      sortable: true,
      render: (_, item) => (
        <div>
          <p className="font-medium">{item.patientName}</p>
          <p className="text-xs text-muted-foreground">{item.patientId}</p>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          <span className="capitalize">{sampleTypeLabels[String(value)] || value}</span>
        </div>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => (
        <PriorityIndicator priority={value as 'low' | 'normal' | 'high' | 'urgent'} />
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={String(value)} />,
    },
    {
      key: 'tests',
      label: 'Tests',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {(value as string[]).slice(0, 2).map((test) => (
            <span
              key={test}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground"
            >
              {test}
            </span>
          ))}
          {(value as string[]).length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{(value as string[]).length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'receivedAt',
      label: 'Received',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-muted-foreground">{formatDate(String(value))}</span>
      ),
    },
    {
      key: 'technicianName',
      label: 'Technician',
      render: (value) => (
        <span className="text-sm">{value ? String(value) : '-'}</span>
      ),
    },
  ]

  const handleDelete = (id: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Samples"
        description="Manage and track all laboratory samples"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Sample
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register New Sample</DialogTitle>
              <DialogDescription>
                Enter the details of the new sample to register it in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input id="patientId" placeholder="P-XXXXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sampleType">Sample Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blood">Blood</SelectItem>
                      <SelectItem value="urine">Urine</SelectItem>
                      <SelectItem value="tissue">Tissue</SelectItem>
                      <SelectItem value="swab">Swab</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tests">Tests Required</Label>
                <Input id="tests" placeholder="CBC, Lipid Panel, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any additional notes..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Register Sample
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DataTable
          columns={columns}
          data={samples}
          selectable
          searchPlaceholder="Search samples by code, patient, or type..."
          onSearch={(query) => {
            const filtered = mockSamples.filter(
              (s) =>
                s.code.toLowerCase().includes(query.toLowerCase()) ||
                s.patientName.toLowerCase().includes(query.toLowerCase()) ||
                s.type.toLowerCase().includes(query.toLowerCase())
            )
            setSamples(filtered)
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
