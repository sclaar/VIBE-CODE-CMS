import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import RoleCard from './RoleCard'
import { Role, Permission } from './types'

const RoleManagement: React.FC = () => {
  const [permissions] = useState<Permission[]>([
    { id: '1', name: 'Videos anzeigen', description: 'Kann Videos ansehen und durchsuchen', category: 'videos' },
    { id: '2', name: 'Videos bearbeiten', description: 'Kann Videos hochladen, bearbeiten und löschen', category: 'videos' },
    { id: '3', name: 'Videos veröffentlichen', description: 'Kann Videos veröffentlichen und Status ändern', category: 'videos' },
    { id: '4', name: 'Benutzer anzeigen', description: 'Kann Benutzerliste einsehen', category: 'users' },
    { id: '5', name: 'Benutzer verwalten', description: 'Kann Benutzer erstellen, bearbeiten und löschen', category: 'users' },
    { id: '6', name: 'Kategorien verwalten', description: 'Kann Kategorien erstellen und bearbeiten', category: 'categories' },
    { id: '7', name: 'Einstellungen verwalten', description: 'Kann Systemeinstellungen ändern', category: 'settings' }
  ])

  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Administrator',
      description: 'Vollzugriff auf alle Funktionen des Systems',
      permissions: permissions,
      userCount: 2,
      isSystemRole: true,
      color: '#EF4444'
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Kann Videos verwalten und veröffentlichen',
      permissions: permissions.filter(p => ['1', '2', '3', '4', '6'].includes(p.id)),
      userCount: 5,
      isSystemRole: true,
      color: '#3B82F6'
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Kann nur Videos ansehen',
      permissions: permissions.filter(p => ['1'].includes(p.id)),
      userCount: 12,
      isSystemRole: true,
      color: '#10B981'
    },
    {
      id: '4',
      name: 'Content Manager',
      description: 'Spezialisiert auf Content-Verwaltung',
      permissions: permissions.filter(p => ['1', '2', '6'].includes(p.id)),
      userCount: 3,
      isSystemRole: false,
      color: '#8B5CF6'
    },
    {
      id: '5',
      name: 'Client Manager',
      description: 'Verwaltet kundenspezifische Inhalte',
      permissions: permissions.filter(p => ['1', '2', '4'].includes(p.id)),
      userCount: 7,
      isSystemRole: false,
      color: '#F59E0B'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Rollenverwaltung</h2>
            <p className="text-gray-600 mt-1">Verwalten Sie Benutzerrollen und Berechtigungen</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Rolle hinzufügen</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rollen suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Keine Rollen gefunden</p>
        </div>
      )}
    </div>
  )
}

export default RoleManagement
