import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import CategoryCard from './CategoryCard'
import { Category } from './types'

const CategoryManagement: React.FC = () => {
  const [categories] = useState<Category[]>([
    {
      id: '1',
      name: 'Automotive',
      description: 'Videos für Automobilhersteller und -händler',
      color: '#3B82F6',
      videoCount: 15,
      isActive: true
    },
    {
      id: '2',
      name: 'Corporate',
      description: 'Unternehmensvideos und Präsentationen',
      color: '#10B981',
      videoCount: 23,
      isActive: true
    },
    {
      id: '3',
      name: 'Fashion & Sport',
      description: 'Mode- und Sportmarken Kampagnen',
      color: '#F59E0B',
      videoCount: 8,
      isActive: true
    },
    {
      id: '4',
      name: 'Finance',
      description: 'Finanzdienstleistungen und Banking',
      color: '#8B5CF6',
      videoCount: 12,
      isActive: false
    },
    {
      id: '5',
      name: 'Travel',
      description: 'Reise- und Tourismusbranche',
      color: '#EF4444',
      videoCount: 6,
      isActive: true
    },
    {
      id: '6',
      name: 'Technology',
      description: 'Tech-Unternehmen und Software',
      color: '#06B6D4',
      videoCount: 19,
      isActive: true
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Kategorienverwaltung</h2>
            <p className="text-gray-600 mt-1">Organisieren Sie Videos nach Kategorien</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Kategorie hinzufügen</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Kategorien suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Keine Kategorien gefunden</p>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
