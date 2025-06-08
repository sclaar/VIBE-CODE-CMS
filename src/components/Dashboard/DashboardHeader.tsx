import React from 'react'

const DashboardHeader: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Video Dashboard</h1>
        <p className="text-blue-100">
          Verwalten Sie Ihre Video-Inhalte und überwachen Sie die Performance
        </p>
      </div>
    </div>
  )
}

export default DashboardHeader
