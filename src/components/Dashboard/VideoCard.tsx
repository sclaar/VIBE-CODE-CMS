import React from 'react'
import { Calendar } from 'lucide-react'
import { VideoCardProps } from './types'

const VideoCard: React.FC<VideoCardProps> = ({ video, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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

  const getTagColor = (tag: string, index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-orange-100 text-orange-800',
      'bg-teal-100 text-teal-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-cyan-100 text-cyan-800'
    ]
    
    // Hash-basierte Farbauswahl für konsistente Farben pro Tag
    let hash = 0
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash)
    }
    const colorIndex = Math.abs(hash) % colors.length
    return colors[colorIndex]
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col cursor-pointer"
      onClick={() => onEdit(video)}
    >
      {/* Thumbnail - Fixed 16:9 aspect ratio container */}
      <div className="relative w-full h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header - Fixed height */}
        <div className="mb-3 h-6">
          <h3 className="font-semibold text-gray-900 truncate leading-6">
            {video.title}
          </h3>
        </div>

        {/* Client & Category - Fixed height */}
        <div className="space-y-2 mb-3 h-10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Kunde:</span>
            <span className="font-medium text-gray-900 truncate ml-2">{video.client}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Kategorie:</span>
            <span className="text-blue-600 font-medium truncate ml-2">{video.category}</span>
          </div>
        </div>

        {/* Description - Fixed height (2 lines) */}
        <div className="mb-3 h-10">
          <p className="text-sm text-gray-600 line-clamp-2 leading-5">
            {video.description}
          </p>
        </div>

        {/* Tags - Fixed height */}
        <div className="mb-3 h-6">
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 text-xs font-medium rounded leading-none ${getTagColor(tag, index)}`}
              >
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded leading-none font-medium">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer - Fixed height and position */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto h-8">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{new Date(video.uploadDate).toLocaleDateString('de-DE')}</span>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(video.status)}`}>
            {getStatusText(video.status)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
