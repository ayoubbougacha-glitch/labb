'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
  delay?: number
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  trend,
  className,
  delay = 0,
}: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success'
    if (trend === 'down') return 'text-destructive'
    return 'text-muted-foreground'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className={cn('relative overflow-hidden hover:shadow-md transition-shadow', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {change !== undefined && (
                <div className={cn('flex items-center gap-1 text-xs', getTrendColor())}>
                  {getTrendIcon()}
                  <span className="font-medium">
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                  <span className="text-muted-foreground">{changeLabel}</span>
                </div>
              )}
            </div>
            {icon && (
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                {icon}
              </div>
            )}
          </div>
        </CardContent>
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
      </Card>
    </motion.div>
  )
}
