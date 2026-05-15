'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6', className)}
    >
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm md:text-base">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </motion.div>
  )
}
