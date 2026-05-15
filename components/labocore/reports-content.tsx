'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Filter,
  Printer,
  Mail,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/labocore'

// Mock data for charts
const monthlyTrendsData = [
  { month: 'Jan', samples: 2840, completed: 2750, turnaround: 2.1 },
  { month: 'Feb', samples: 3120, completed: 3050, turnaround: 2.0 },
  { month: 'Mar', samples: 3450, completed: 3380, turnaround: 1.9 },
  { month: 'Apr', samples: 3280, completed: 3200, turnaround: 2.2 },
  { month: 'May', samples: 3680, completed: 3600, turnaround: 2.1 },
  { month: 'Jun', samples: 3520, completed: 3450, turnaround: 2.0 },
]

const departmentPerformance = [
  { name: 'Clinical Chemistry', samples: 1250, accuracy: 99.2 },
  { name: 'Hematology', samples: 980, accuracy: 98.8 },
  { name: 'Microbiology', samples: 720, accuracy: 99.5 },
  { name: 'Molecular', samples: 540, accuracy: 97.9 },
  { name: 'Urinalysis', samples: 450, accuracy: 98.5 },
]

const testVolumeByType = [
  { type: 'Blood Tests', volume: 4250 },
  { type: 'Urine Tests', volume: 1820 },
  { type: 'Culture Tests', volume: 980 },
  { type: 'Molecular Tests', volume: 720 },
  { type: 'Other', volume: 450 },
]

const qualityMetrics = [
  { metric: 'QC Pass Rate', value: 99.2, target: 99.0 },
  { metric: 'First-Time Right', value: 97.8, target: 95.0 },
  { metric: 'Critical Value Reporting', value: 100, target: 100 },
  { metric: 'Sample Rejection Rate', value: 1.2, target: 2.0 },
]

const recentReports = [
  { id: '1', name: 'Monthly Performance Report - January 2024', type: 'Performance', date: '2024-01-31', status: 'completed' },
  { id: '2', name: 'Quality Metrics Dashboard - Q4 2023', type: 'Quality', date: '2024-01-15', status: 'completed' },
  { id: '3', name: 'Inventory Usage Analysis', type: 'Inventory', date: '2024-01-10', status: 'completed' },
  { id: '4', name: 'Technician Performance Review', type: 'HR', date: '2024-01-08', status: 'completed' },
  { id: '5', name: 'Equipment Maintenance Log', type: 'Operations', date: '2024-01-05', status: 'completed' },
]

export default function ReportsContent() {
  const [dateRange, setDateRange] = useState('6m')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Analytics and reporting dashboard"
      >
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </PageHeader>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="quality" className="gap-2">
            <PieChart className="h-4 w-4" />
            Quality
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sample Volume Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sample Volume Trends</CardTitle>
                  <CardDescription>Monthly samples received vs completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyTrendsData}>
                        <defs>
                          <linearGradient id="colorSamples2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorCompleted2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                        <YAxis className="text-xs fill-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="samples"
                          stroke="hsl(var(--chart-1))"
                          fillOpacity={1}
                          fill="url(#colorSamples2)"
                          name="Received"
                        />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          stroke="hsl(var(--chart-2))"
                          fillOpacity={1}
                          fill="url(#colorCompleted2)"
                          name="Completed"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Test Volume by Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Test Volume by Type</CardTitle>
                  <CardDescription>Distribution of tests performed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={testVolumeByType} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                        <XAxis type="number" className="text-xs fill-muted-foreground" />
                        <YAxis dataKey="type" type="category" className="text-xs fill-muted-foreground" width={100} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="volume" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Turnaround Time Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Average Turnaround Time</CardTitle>
                <CardDescription>Monthly average processing time in hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" domain={[0, 3]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`${value}h`, 'Avg Time']}
                      />
                      <Line
                        type="monotone"
                        dataKey="turnaround"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Sample volume and accuracy by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                      <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                      <YAxis yAxisId="left" className="text-xs fill-muted-foreground" />
                      <YAxis yAxisId="right" orientation="right" domain={[95, 100]} className="text-xs fill-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="samples" fill="hsl(var(--chart-1))" name="Samples" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-2))" name="Accuracy %" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Quality Tab */}
        <TabsContent value="quality" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {qualityMetrics.map((metric, index) => {
              const isGood = metric.metric === 'Sample Rejection Rate' 
                ? metric.value <= metric.target 
                : metric.value >= metric.target
              return (
                <Card key={metric.metric} className={isGood ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'}>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                    <div className="flex items-end justify-between mt-2">
                      <p className={`text-3xl font-bold ${isGood ? 'text-success' : 'text-warning'}`}>
                        {metric.value}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Target: {metric.target}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Recent reports and exports</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Generate New Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="px-2 py-0.5 rounded-md bg-muted text-xs">{report.type}</span>
                            <span>{new Date(report.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
