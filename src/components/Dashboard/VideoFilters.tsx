import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { VideoFiltersProps } from './types'

const VideoFilters: React.FC<VideoFiltersProps> = ({
  videos,
  filteredVideos,
  searchTerm,
  setSearchTerm,
  selectedClient,
  setSelectedClient,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  onClearFilters
}) => {
  // Get unique values for filters
  const clients = [...new Set(videos.map(video => video.client))].sort()
  const categories = [...new Set(videos.map(video => video.category))].sort()
  const statuses = ['published', 'draft', 'processing']

  const hasActiveFilters = searchTerm || selectedClient || selectedCategory || selectedStatus

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Veröffentlicht'
      case 'draft':
        return 'Entwurf'
      case 'processing':
        return 'Verarbeitung'
      default:
        return status
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Suchen & Filtern</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Filter zurücksetzen</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Videos durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Client Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kunde
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Alle Kunden</option>
              {clients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Alle Kategorien</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Alle Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{getStatusText(status)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Suche: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedClient && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Kunde: {selectedClient}
                <button
                  onClick={() => setSelectedClient('')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Kategorie: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedStatus && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Status: {getStatusText(selectedStatus)}
                <button
                  onClick={() => setSelectedStatus('')}
                  className="ml-1 text-orange-600 hover:text-orange-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Results Counter */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {filteredVideos.length} von {videos.length} Videos gefunden
          </span>
          {hasActiveFilters && (
            <span className="text-blue-600">
              {videos.length - filteredVideos.length} Videos gefiltert
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoFilters
