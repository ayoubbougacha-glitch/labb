'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type StatusType = 
  | 'pending' | 'in-progress' | 'completed' | 'cancelled'
  | 'normal' | 'abnormal' | 'critical'
  | 'low' | 'high' | 'urgent'
  | 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired'
  | 'active' | 'inactive' | 'on-leave'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Sample/Result status
  pending: { 
    label: 'Pending', 
    className: 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20' 
  },
  'in-progress': { 
    label: 'In Progress', 
    className: 'bg-info/15 text-info border-info/30 hover:bg-info/20' 
  },
  completed: { 
    label: 'Completed', 
    className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' 
  },
  cancelled: { 
    label: 'Cancelled', 
    className: 'bg-muted text-muted-foreground border-border hover:bg-muted' 
  },

  // Result status
  normal: { 
    label: 'Normal', 
    className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' 
  },
  abnormal: { 
    label: 'Abnormal', 
    className: 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20' 
  },
  critical: { 
    label: 'Critical', 
    className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' 
  },

  // Priority
  low: { 
    label: 'Low', 
    className: 'bg-muted text-muted-foreground border-border hover:bg-muted' 
  },
  high: { 
    label: 'High', 
    className: 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20' 
  },
  urgent: { 
    label: 'Urgent', 
    className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' 
  },

  // Inventory status
  'in-stock': { 
    label: 'In Stock', 
    className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' 
  },
  'low-stock': { 
    label: 'Low Stock', 
    className: 'bg-warning/15 text-warning border-warning/30 hover:bg-warning/20' 
  },
  'out-of-stock': { 
    label: 'Out of Stock', 
    className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' 
  },
  expired: { 
    label: 'Expired', 
    className: 'bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20' 
  },

  // User/Technician status
  active: { 
    label: 'Active', 
    className: 'bg-success/15 text-success border-success/30 hover:bg-success/20' 
  },
  inactive: { 
    label: 'Inactive', 
    className: 'bg-muted text-muted-foreground border-border hover:bg-muted' 
  },
  'on-leave': { 
    label: 'On Leave', 
    className: 'bg-info/15 text-info border-info/30 hover:bg-info/20' 
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { 
    label: status, 
    className: 'bg-muted text-muted-foreground border-border' 
  }

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium text-xs px-2 py-0.5 rounded-md border transition-colors',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}

// Priority indicator with dot
interface PriorityIndicatorProps {
  priority: 'low' | 'normal' | 'high' | 'urgent'
  showLabel?: boolean
  className?: string
}

const priorityColors = {
  low: 'bg-muted-foreground',
  normal: 'bg-primary',
  high: 'bg-warning',
  urgent: 'bg-destructive',
}

export function PriorityIndicator({ priority, showLabel = true, className }: PriorityIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('h-2 w-2 rounded-full', priorityColors[priority])} />
      {showLabel && (
        <span className="text-sm capitalize">{priority}</span>
      )}
    </div>
  )
}
