import React from 'react'
import { Shield, Users, Edit, Trash2 } from 'lucide-react'
import { Role } from './types'

interface RoleCardProps {
  role: Role
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  const getPermissionCategoryIcon = (category: string) => {
    switch (category) {
      case 'videos':
        return '🎥'
      case 'users':
        return '👥'
      case 'categories':
        return '🏷️'
      case 'settings':
        return '⚙️'
      default:
        return '🔧'
    }
  }

  const getPermissionCategoryName = (category: string) => {
    switch (category) {
      case 'videos':
        return 'Videos'
      case 'users':
        return 'Benutzer'
      case 'categories':
        return 'Kategorien'
      case 'settings':
        return 'Einstellungen'
      default:
        return category
    }
  }

  const permissionsByCategory = role.permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, typeof role.permissions>)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${role.color}20` }}
          >
            <Shield className="w-5 h-5" style={{ color: role.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{role.name}</h3>
            {role.isSystemRole && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded mt-1">
                Systemrolle
              </span>
            )}
          </div>
        </div>
        
        {!role.isSystemRole && (
          <div className="flex space-x-1">
            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{role.description}</p>

      {/* User Count */}
      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
        <Users className="w-4 h-4" />
        <span>{role.userCount} Benutzer</span>
      </div>

      {/* Permissions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Berechtigungen:</h4>
        <div className="space-y-2">
          {Object.entries(permissionsByCategory).map(([category, permissions]) => (
            <div key={category} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPermissionCategoryIcon(category)}</span>
                <span className="text-gray-600">{getPermissionCategoryName(category)}</span>
              </div>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {permissions.length}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Permissions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Gesamt Berechtigungen:</span>
          <span className="font-medium text-gray-900">{role.permissions.length}</span>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
