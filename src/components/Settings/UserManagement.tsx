import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import UserTableRow from './UserTableRow'
import { User } from './types'

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Max Mustermann',
      email: 'max.mustermann@agency.de',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      name: 'Anna Schmidt',
      email: 'anna.schmidt@agency.de',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      name: 'Tom Weber',
      email: 'tom.weber@agency.de',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '2024-01-10T14:20:00Z',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Benutzerverwaltung</h2>
            <p className="text-gray-600 mt-1">Verwalten Sie Benutzer und deren Berechtigungen</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Benutzer hinzufügen</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Benutzer suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benutzer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rolle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Letzter Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Keine Benutzer gefunden</p>
        </div>
      )}
    </div>
  )
}

export default UserManagement
