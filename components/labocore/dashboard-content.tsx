'use client'

import { motion } from 'framer-motion'
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Package,
  Activity,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard, PageHeader, StatusBadge } from '@/components/labocore'
import { cn } from '@/lib/utils'

// Mock data
const dailySamplesData = [
  { name: 'Mon', samples: 45, completed: 42 },
  { name: 'Tue', samples: 52, completed: 48 },
  { name: 'Wed', samples: 61, completed: 55 },
  { name: 'Thu', samples: 48, completed: 45 },
  { name: 'Fri', samples: 55, completed: 52 },
  { name: 'Sat', samples: 32, completed: 30 },
  { name: 'Sun', samples: 28, completed: 26 },
]

const sampleTypeData = [
  { name: 'Blood', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Urine', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Tissue', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Swab', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 5, color: 'hsl(var(--chart-5))' },
]

const processingTimeData = [
  { name: '6am', time: 2.1 },
  { name: '8am', time: 2.5 },
  { name: '10am', time: 3.2 },
  { name: '12pm', time: 2.8 },
  { name: '2pm', time: 2.4 },
  { name: '4pm', time: 2.6 },
  { name: '6pm', time: 2.2 },
]

const recentSamples = [
  { id: 'BL-2024-0892', patient: 'John Smith', type: 'blood', status: 'critical', time: '5 min ago' },
  { id: 'UR-2024-0891', patient: 'Jane Doe', type: 'urine', status: 'pending', time: '12 min ago' },
  { id: 'BL-2024-0890', patient: 'Robert Wilson', type: 'blood', status: 'in-progress', time: '25 min ago' },
  { id: 'SW-2024-0889', patient: 'Emily Brown', type: 'swab', status: 'completed', time: '32 min ago' },
  { id: 'TI-2024-0888', patient: 'Michael Davis', type: 'tissue', status: 'completed', time: '45 min ago' },
]

const topTechnicians = [
  { name: 'Dr. Sarah Chen', samples: 156, accuracy: 99.2 },
  { name: 'James Wilson', samples: 142, accuracy: 98.8 },
  { name: 'Maria Garcia', samples: 138, accuracy: 99.5 },
  { name: 'David Kim', samples: 125, accuracy: 97.9 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here&apos;s an overview of your lab operations."
      />

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          title="Total Samples Today"
          value="321"
          change={12.5}
          trend="up"
          icon={<FlaskConical className="h-5 w-5" />}
          delay={0}
        />
        <StatCard
          title="Pending Analysis"
          value="47"
          change={-8.2}
          trend="down"
          icon={<Clock className="h-5 w-5" />}
          delay={0.1}
        />
        <StatCard
          title="Completed Today"
          value="274"
          change={15.3}
          trend="up"
          icon={<CheckCircle2 className="h-5 w-5" />}
          delay={0.2}
        />
        <StatCard
          title="Critical Results"
          value="8"
          change={2}
          changeLabel="new alerts"
          trend="up"
          icon={<AlertTriangle className="h-5 w-5" />}
          delay={0.3}
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sample Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Sample Volume
              </CardTitle>
              <CardDescription>Daily samples received vs completed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailySamplesData}>
                    <defs>
                      <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
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
                      fill="url(#colorSamples)"
                      name="Received"
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stroke="hsl(var(--chart-2))"
                      fillOpacity={1}
                      fill="url(#colorCompleted)"
                      name="Completed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sample Types Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Sample Distribution
              </CardTitle>
              <CardDescription>Breakdown by sample type this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sampleTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sampleTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Processing Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Processing Time
              </CardTitle>
              <CardDescription>Average hours by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processingTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                    <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value}h`, 'Avg Time']}
                    />
                    <Bar dataKey="time" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Samples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Recent Samples
              </CardTitle>
              <CardDescription>Latest samples requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSamples.map((sample, index) => (
                  <motion.div
                    key={sample.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className={cn(
                      'flex items-center justify-between py-2 px-3 rounded-lg',
                      'hover:bg-muted/50 transition-colors cursor-pointer'
                    )}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{sample.id}</p>
                      <p className="text-xs text-muted-foreground">{sample.patient}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={sample.status} />
                      <span className="text-xs text-muted-foreground">{sample.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Technicians */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Performers
              </CardTitle>
              <CardDescription>Technicians this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTechnicians.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                      index === 0 && 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
                      index === 1 && 'bg-gray-500/20 text-gray-600 dark:text-gray-400',
                      index === 2 && 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
                      index > 2 && 'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.samples} samples</p>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">{tech.accuracy}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Low Stock Items</p>
                <p className="text-lg font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">QC Pass Rate</p>
                <p className="text-lg font-semibold">99.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Turnaround</p>
                <p className="text-lg font-semibold">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-info/10 to-info/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/20">
                <Users className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Technicians</p>
                <p className="text-lg font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
