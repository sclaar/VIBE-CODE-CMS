import React, { useState } from 'react'
import SettingsSidebar from './SettingsSidebar'
import UserManagement from './UserManagement'
import CategoryManagement from './CategoryManagement'
import RoleManagement from './RoleManagement'
import { SettingsView } from './types'

const Settings: React.FC = () => {
  const [activeView, setActiveView] = useState<SettingsView>('users')

  return (
    <div className="flex gap-6">
      <SettingsSidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1">
        {activeView === 'users' && <UserManagement />}
        {activeView === 'categories' && <CategoryManagement />}
        {activeView === 'roles' && <RoleManagement />}
      </div>
    </div>
  )
}

export default Settings
