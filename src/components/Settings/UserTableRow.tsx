import React from 'react'
import { Edit, Trash2, MoreVertical } from 'lucide-react'
import { User } from './types'

interface UserTableRowProps {
  user: User
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user }) => {
  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return 'bg-red-100 text-red-800'
      case 'editor':
        return 'bg-blue-100 text-blue-800'
      case 'viewer':
        return 'bg-green-100 text-green-800'
      case 'content manager':
        return 'bg-purple-100 text-purple-800'
      case 'client manager':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.avatar}
            alt={user.name}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatLastLogin(user.lastLogin)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserTableRow
