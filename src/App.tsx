import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Settings from './components/Settings/Settings'

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'settings'>('dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' ? <Dashboard /> : <Settings />}
      </main>
    </div>
  )
}

export default App
