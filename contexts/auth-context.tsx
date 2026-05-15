'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User, Notification } from '@/types/labocore'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  email: 'admin@labocore.com',
  name: 'Dr. Sarah Chen',
  role: 'admin',
  department: 'Clinical Chemistry',
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Critical Result Alert',
    message: 'Sample #BL-2024-0892 has critical glucose levels requiring immediate attention.',
    type: 'error',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '2',
    title: 'Low Stock Warning',
    message: 'Hemoglobin A1c Test Kits are below minimum stock level (15 remaining).',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: '3',
    title: 'New Samples Received',
    message: '24 new samples have been received and are pending processing.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
  },
  {
    id: '4',
    title: 'Quality Control Passed',
    message: 'Daily QC checks for all analyzers have been completed successfully.',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('labocore_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password) {
      setUser(mockUser)
      localStorage.setItem('labocore_user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('labocore_user')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
