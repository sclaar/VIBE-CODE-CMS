import React from 'react'
import { Users, Tag, Shield } from 'lucide-react'
import { SettingsView } from './types'

interface SettingsSidebarProps {
  activeView: SettingsView
  setActiveView: (view: SettingsView) => void
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'users' as SettingsView, label: 'Benutzerverwaltung', icon: Users },
    { id: 'categories' as SettingsView, label: 'Kategorien', icon: Tag },
    { id: 'roles' as SettingsView, label: 'Rollenverwaltung', icon: Shield }
  ]

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Einstellungen</h2>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                activeView === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default SettingsSidebar
