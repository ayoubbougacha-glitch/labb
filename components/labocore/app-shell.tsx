'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LabocoreSidebar } from './sidebar'
import { LabocoreTopbar } from './topbar'
import { AuthProvider } from '@/contexts/auth-context'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Microscope } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
}

function AppShellContent({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <LabocoreSidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex h-16 items-center gap-3 px-4 border-b border-sidebar-border bg-sidebar">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Microscope className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg text-sidebar-foreground">
              LABOCORE
            </span>
          </div>
          <MobileSidebar onNavigate={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div
        className={cn(
          'min-h-screen transition-all duration-200',
          sidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-[256px]'
        )}
      >
        <LabocoreTopbar
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          showMobileMenu={mobileMenuOpen}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function MobileSidebar({ onNavigate }: { onNavigate: () => void }) {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Samples', href: '/samples' },
    { label: 'Results', href: '/results' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Suppliers', href: '/suppliers' },
    { label: 'Technicians', href: '/technicians' },
    { label: 'Reports', href: '/reports' },
    { label: 'Settings', href: '/settings' },
  ]

  return (
    <nav className="py-4 px-3 bg-sidebar h-full">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function AppShell({ children }: AppShellProps) {
  return (
    <AuthProvider>
      <AppShellContent>{children}</AppShellContent>
    </AuthProvider>
  )
}
