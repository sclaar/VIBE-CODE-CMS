import React, { useState, useEffect } from 'react'
import { X, Save, Tag, Plus } from 'lucide-react'
import { Video } from './types'

interface VideoEditModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedVideo: Video) => void
  clients: string[]
  categories: string[]
}

const VideoEditModal: React.FC<VideoEditModalProps> = ({
  video,
  isOpen,
  onClose,
  onSave,
  clients,
  categories
}) => {
  const [formData, setFormData] = useState<Video | null>(null)
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (video) {
      setFormData({ ...video })
    }
  }, [video])

  if (!isOpen || !formData) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Video bearbeiten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex overflow-hidden">
          {/* Left Column - Thumbnail & File Info */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            {/* Thumbnail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Video Vorschau
              </label>
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.thumbnail}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded">
                  {formData.duration}
                </div>
              </div>
            </div>

            {/* File Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Datei-Informationen
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Upload-Datum:</span>
                  <p className="font-medium">{new Date(formData.uploadDate).toLocaleDateString('de-DE')}</p>
                </div>
                <div>
                  <span className="text-gray-500">Aufrufe:</span>
                  <p className="font-medium">{formData.views.toLocaleString('de-DE')}</p>
                </div>
                <div>
                  <span className="text-gray-500">Dauer:</span>
                  <p className="font-medium">{formData.duration}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">
                    {formData.status === 'published' && 'Veröffentlicht'}
                    {formData.status === 'draft' && 'Entwurf'}
                    {formData.status === 'processing' && 'Verarbeitung'}
                  </p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              
              {/* Existing Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New Tag */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Neuen Tag hinzufügen..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kunde
                </label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {clients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Video['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Entwurf</option>
                  <option value="processing">Verarbeitung</option>
                  <option value="published">Veröffentlicht</option>
                </select>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dauer
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="z.B. 2:30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoEditModal
