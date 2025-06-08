export interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  client: string
  category: string
  uploadDate: string
  views: number
  status: 'published' | 'draft' | 'processing'
  description: string
  tags: string[]
  videoUrl?: string
}

export interface VideoFiltersProps {
  videos: Video[]
  filteredVideos: Video[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedClient: string
  setSelectedClient: (client: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  onClearFilters: () => void
}

export interface VideoCardProps {
  video: Video
  onEdit: (video: Video) => void
}

export interface VideoGridProps {
  videos: Video[]
}
