import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import VideoCard from './VideoCard'
import VideoEditModal from './VideoEditModal'
import { VideoGridProps, Video } from './types'

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [videoList, setVideoList] = useState<Video[]>(videos)

  // Update video list when videos prop changes
  React.useEffect(() => {
    setVideoList(videos)
  }, [videos])

  // Get unique values for modal dropdowns
  const clients = React.useMemo(() => {
    const uniqueClients = Array.from(new Set(videoList.map(video => video.client)))
    return uniqueClients.sort()
  }, [videoList])

  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(videoList.map(video => video.category)))
    return uniqueCategories.sort()
  }, [videoList])

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video)
    setIsModalOpen(true)
  }

  const handleSaveVideo = (updatedVideo: Video) => {
    setVideoList(prevVideos => 
      prevVideos.map(video => 
        video.id === updatedVideo.id ? updatedVideo : video
      )
    )
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingVideo(null)
  }

  return (
    <div className="space-y-6">
      {/* Video Grid */}
      {videoList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoList.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onEdit={handleEditVideo}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Videos gefunden</h3>
          <p className="mt-1 text-sm text-gray-500">
            Versuchen Sie andere Suchkriterien oder setzen Sie die Filter zurück.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <VideoEditModal
        video={editingVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
        clients={clients}
        categories={categories}
      />
    </div>
  )
}

export default VideoGrid
