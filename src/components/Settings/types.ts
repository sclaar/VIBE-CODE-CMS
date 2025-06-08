export interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
  avatar: string
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
  videoCount: number
  isActive: boolean
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  userCount: number
  isSystemRole: boolean
  color: string
}

export interface Permission {
  id: string
  name: string
  description: string
  category: 'videos' | 'users' | 'categories' | 'settings'
}

export type SettingsView = 'users' | 'categories' | 'roles'
