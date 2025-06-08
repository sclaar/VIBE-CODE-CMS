import React from 'react'
import { Video, Settings, User, ChevronDown } from 'lucide-react'

interface HeaderProps {
  activeView: 'dashboard' | 'settings'
  setActiveView: (view: 'dashboard' | 'settings') => void
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Clickable */}
          <button 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 focus:outline-none p-1"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">VIBE.VIDEO.CMS</h1>
              <p className="text-xs text-gray-500">Video Content Management</p>
            </div>
          </button>

          {/* Center Navigation */}
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
                activeView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
                activeView === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Einstellungen</span>
            </button>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Max Mustermann</p>
                <p className="text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
