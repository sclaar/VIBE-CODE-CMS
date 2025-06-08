import React from 'react'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Category } from './types'

interface CategoryCardProps {
  category: Category
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: category.color }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-500">{category.videoCount} Videos</span>
              {category.isActive ? (
                <Eye className="w-4 h-4 text-green-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{category.description}</p>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          category.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {category.isActive ? 'Aktiv' : 'Inaktiv'}
        </span>
        
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span className="text-xs text-gray-500 font-mono">{category.color}</span>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
