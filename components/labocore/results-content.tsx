'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, CheckCircle2, XCircle, FileText, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, PageHeader, StatusBadge, type Column } from '@/components/labocore'
import type { Result } from '@/types/labocore'

// Mock data
const mockResults: Result[] = [
  {
    id: '1',
    sampleId: '1',
    sampleCode: 'BL-2024-0892',
    testName: 'Complete Blood Count (CBC)',
    value: '14.2',
    unit: 'g/dL',
    referenceRange: '12.0 - 16.0',
    status: 'normal',
    technicianId: '1',
    technicianName: 'Dr. Sarah Chen',
    validatedAt: '2024-01-15T10:30:00Z',
    validatedBy: 'Dr. Sarah Chen',
    createdAt: '2024-01-15T09:45:00Z',
  },
  {
    id: '2',
    sampleId: '1',
    sampleCode: 'BL-2024-0892',
    testName: 'Glucose (Fasting)',
    value: '285',
    unit: 'mg/dL',
    referenceRange: '70 - 100',
    status: 'critical',
    technicianId: '1',
    technicianName: 'Dr. Sarah Chen',
    createdAt: '2024-01-15T09:50:00Z',
  },
  {
    id: '3',
    sampleId: '2',
    sampleCode: 'UR-2024-0891',
    testName: 'Urinalysis - pH',
    value: '6.5',
    unit: '',
    referenceRange: '4.5 - 8.0',
    status: 'normal',
    technicianId: '2',
    technicianName: 'James Wilson',
    validatedAt: '2024-01-15T09:00:00Z',
    validatedBy: 'James Wilson',
    createdAt: '2024-01-15T08:45:00Z',
  },
  {
    id: '4',
    sampleId: '3',
    sampleCode: 'BL-2024-0890',
    testName: 'TSH',
    value: '8.5',
    unit: 'mIU/L',
    referenceRange: '0.4 - 4.0',
    status: 'abnormal',
    technicianId: '3',
    technicianName: 'Maria Garcia',
    validatedAt: '2024-01-15T07:30:00Z',
    validatedBy: 'Dr. Sarah Chen',
    createdAt: '2024-01-15T07:00:00Z',
  },
  {
    id: '5',
    sampleId: '3',
    sampleCode: 'BL-2024-0890',
    testName: 'Free T4',
    value: '0.7',
    unit: 'ng/dL',
    referenceRange: '0.8 - 1.8',
    status: 'abnormal',
    technicianId: '3',
    technicianName: 'Maria Garcia',
    validatedAt: '2024-01-15T07:30:00Z',
    validatedBy: 'Dr. Sarah Chen',
    createdAt: '2024-01-15T07:05:00Z',
  },
  {
    id: '6',
    sampleId: '4',
    sampleCode: 'SW-2024-0889',
    testName: 'Rapid Strep Test',
    value: 'Negative',
    unit: '',
    referenceRange: 'Negative',
    status: 'normal',
    technicianId: '4',
    technicianName: 'David Kim',
    validatedAt: '2024-01-14T16:30:00Z',
    validatedBy: 'David Kim',
    createdAt: '2024-01-14T16:15:00Z',
  },
  {
    id: '7',
    sampleId: '6',
    sampleCode: 'BL-2024-0887',
    testName: 'Hemoglobin A1c',
    value: '9.2',
    unit: '%',
    referenceRange: '< 5.7',
    status: 'critical',
    technicianId: '2',
    technicianName: 'James Wilson',
    createdAt: '2024-01-14T14:00:00Z',
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

// Stats for the results overview
const resultsStats = {
  total: 47,
  normal: 32,
  abnormal: 12,
  critical: 3,
  pendingValidation: 8,
}

export default function ResultsContent() {
  const [results, setResults] = useState<Result[]>(mockResults)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: mockResults.length,
  })

  const columns: Column<Result>[] = [
    {
      key: 'sampleCode',
      label: 'Sample',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-medium">{String(value)}</span>
      ),
    },
    {
      key: 'testName',
      label: 'Test',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{String(value)}</span>
      ),
    },
    {
      key: 'value',
      label: 'Result',
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <span className={`font-mono font-medium ${
            item.status === 'critical' ? 'text-destructive' :
            item.status === 'abnormal' ? 'text-warning' :
            'text-foreground'
          }`}>
            {item.value}
          </span>
          {item.unit && (
            <span className="text-sm text-muted-foreground">{item.unit}</span>
          )}
        </div>
      ),
    },
    {
      key: 'referenceRange',
      label: 'Reference Range',
      render: (value) => (
        <span className="text-sm text-muted-foreground">{String(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={String(value)} />,
    },
    {
      key: 'technicianName',
      label: 'Technician',
      render: (value) => (
        <span className="text-sm">{String(value)}</span>
      ),
    },
    {
      key: 'validatedAt',
      label: 'Validated',
      render: (value, item) => (
        value ? (
          <div className="flex items-center gap-1 text-success">
            <CheckCircle2 className="h-3 w-3" />
            <span className="text-xs">{formatDate(String(value))}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-warning">
            <XCircle className="h-3 w-3" />
            <span className="text-xs">Pending</span>
          </div>
        )
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-muted-foreground">{formatDate(String(value))}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="View and validate test results"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-4 md:grid-cols-5"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold">{resultsStats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Normal</p>
                <p className="text-2xl font-bold text-success">{resultsStats.normal}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Abnormal</p>
                <p className="text-2xl font-bold text-warning">{resultsStats.abnormal}</p>
              </div>
              <XCircle className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{resultsStats.critical}</p>
              </div>
              <XCircle className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-info">{resultsStats.pendingValidation}</p>
              </div>
              <FileText className="h-8 w-8 text-info/50" />
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
          data={results}
          selectable
          searchPlaceholder="Search results by sample code, test name..."
          onSearch={(query) => {
            const filtered = mockResults.filter(
              (r) =>
                r.sampleCode.toLowerCase().includes(query.toLowerCase()) ||
                r.testName.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered)
          }}
          actions={(item) => (
            <>
              <DropdownMenuItem className="gap-2">
                <Eye className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {!item.validatedAt && (
                <DropdownMenuItem className="gap-2 text-success focus:text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  Validate
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="gap-2">
                <Send className="h-4 w-4" />
                Send Report
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
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
