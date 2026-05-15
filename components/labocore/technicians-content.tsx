'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Eye, Edit, Trash2, Users, Award, Clock, Activity } from 'lucide-react'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { DataTable, PageHeader, StatusBadge, type Column } from '@/components/labocore'
import type { Technician } from '@/types/labocore'

// Mock data
const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@labocore.com',
    phone: '+1 (555) 111-2222',
    department: 'Clinical Chemistry',
    specialization: ['Biochemistry', 'Immunoassay', 'Toxicology'],
    status: 'active',
    samplesProcessed: 1256,
    avgProcessingTime: 2.3,
    accuracy: 99.2,
    joinedAt: '2020-03-15',
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.wilson@labocore.com',
    phone: '+1 (555) 222-3333',
    department: 'Hematology',
    specialization: ['CBC', 'Coagulation', 'Blood Banking'],
    status: 'active',
    samplesProcessed: 1089,
    avgProcessingTime: 2.1,
    accuracy: 98.8,
    joinedAt: '2021-01-10',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@labocore.com',
    phone: '+1 (555) 333-4444',
    department: 'Microbiology',
    specialization: ['Culture', 'Sensitivity Testing', 'Parasitology'],
    status: 'active',
    samplesProcessed: 987,
    avgProcessingTime: 3.5,
    accuracy: 99.5,
    joinedAt: '2019-08-20',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@labocore.com',
    phone: '+1 (555) 444-5555',
    department: 'Molecular Diagnostics',
    specialization: ['PCR', 'Sequencing', 'Genetic Testing'],
    status: 'on-leave',
    samplesProcessed: 756,
    avgProcessingTime: 4.2,
    accuracy: 97.9,
    joinedAt: '2022-02-01',
  },
  {
    id: '5',
    name: 'Emily Brown',
    email: 'emily.brown@labocore.com',
    phone: '+1 (555) 555-6666',
    department: 'Clinical Chemistry',
    specialization: ['Endocrinology', 'Lipid Panel'],
    status: 'active',
    samplesProcessed: 845,
    avgProcessingTime: 2.0,
    accuracy: 98.5,
    joinedAt: '2021-06-15',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'robert.taylor@labocore.com',
    phone: '+1 (555) 666-7777',
    department: 'Urinalysis',
    specialization: ['Urinalysis', 'Drug Screening'],
    status: 'inactive',
    samplesProcessed: 432,
    avgProcessingTime: 1.8,
    accuracy: 97.2,
    joinedAt: '2023-01-05',
  },
]

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Calculate stats
const technicianStats = {
  total: mockTechnicians.length,
  active: mockTechnicians.filter(t => t.status === 'active').length,
  avgAccuracy: (mockTechnicians.reduce((acc, t) => acc + t.accuracy, 0) / mockTechnicians.length).toFixed(1),
  totalSamples: mockTechnicians.reduce((acc, t) => acc + t.samplesProcessed, 0),
}

export default function TechniciansContent() {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: mockTechnicians.length,
  })

  const columns: Column<Technician>[] = [
    {
      key: 'name',
      label: 'Technician',
      sortable: true,
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(item.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      render: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {(value as string[]).slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground"
            >
              {spec}
            </span>
          ))}
          {(value as string[]).length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{(value as string[]).length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'samplesProcessed',
      label: 'Samples',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{Number(value).toLocaleString()}</span>
      ),
    },
    {
      key: 'accuracy',
      label: 'Accuracy',
      sortable: true,
      render: (value) => {
        const accuracy = Number(value)
        return (
          <div className="w-24">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className={`font-medium ${
                accuracy >= 99 ? 'text-success' :
                accuracy >= 97 ? 'text-warning' :
                'text-destructive'
              }`}>
                {accuracy}%
              </span>
            </div>
            <Progress 
              value={accuracy} 
              className={`h-1.5 ${
                accuracy >= 99 ? '[&>div]:bg-success' :
                accuracy >= 97 ? '[&>div]:bg-warning' :
                '[&>div]:bg-destructive'
              }`}
            />
          </div>
        )
      },
    },
    {
      key: 'avgProcessingTime',
      label: 'Avg Time',
      sortable: true,
      render: (value) => (
        <span className="text-sm">{Number(value).toFixed(1)}h</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={String(value)} />,
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-muted-foreground">{formatDate(String(value))}</span>
      ),
    },
  ]

  const handleDelete = (id: string) => {
    setTechnicians((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technicians"
        description="Manage laboratory technicians and their performance"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Technician
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Technician</DialogTitle>
              <DialogDescription>
                Enter the details of the new technician to add them to the team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="techName">Full Name</Label>
                  <Input id="techName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techEmail">Email</Label>
                  <Input id="techEmail" type="email" placeholder="email@labocore.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="techPhone">Phone</Label>
                  <Input id="techPhone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical-chemistry">Clinical Chemistry</SelectItem>
                      <SelectItem value="hematology">Hematology</SelectItem>
                      <SelectItem value="microbiology">Microbiology</SelectItem>
                      <SelectItem value="molecular">Molecular Diagnostics</SelectItem>
                      <SelectItem value="urinalysis">Urinalysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specializations</Label>
                <Input id="specialization" placeholder="Biochemistry, Immunoassay, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Technician
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
                <p className="text-xs text-muted-foreground">Total Technicians</p>
                <p className="text-2xl font-bold">{technicianStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{technicianStats.active}</p>
              </div>
              <Users className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                <p className="text-2xl font-bold text-primary">{technicianStats.avgAccuracy}%</p>
              </div>
              <Award className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Samples</p>
                <p className="text-2xl font-bold text-info">{technicianStats.totalSamples.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-info/50" />
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
          data={technicians}
          selectable
          searchPlaceholder="Search technicians by name, department..."
          onSearch={(query) => {
            const filtered = mockTechnicians.filter(
              (t) =>
                t.name.toLowerCase().includes(query.toLowerCase()) ||
                t.department.toLowerCase().includes(query.toLowerCase()) ||
                t.email.toLowerCase().includes(query.toLowerCase())
            )
            setTechnicians(filtered)
          }}
          actions={(item) => (
            <>
              <DropdownMenuItem className="gap-2">
                <Eye className="h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Activity className="h-4 w-4" />
                View Performance
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                Remove
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
