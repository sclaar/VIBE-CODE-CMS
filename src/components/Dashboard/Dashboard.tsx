import React, { useState, useMemo } from 'react'
import VideoFilters from './VideoFilters'
import VideoGrid from './VideoGrid'
import DashboardHeader from './DashboardHeader'
import { Video } from './types'

const Dashboard: React.FC = () => {
  const [videos] = useState<Video[]>([
    {
      id: '1',
      title: 'Produktlaunch BMW X5 2024',
      thumbnail: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '2:45',
      client: 'BMW Deutschland',
      category: 'Automotive',
      uploadDate: '2024-01-15',
      views: 12450,
      status: 'published',
      description: 'Exklusiver Einblick in den neuen BMW X5 mit innovativen Features',
      tags: ['BMW', 'Automotive', 'Produktlaunch', '2024']
    },
    {
      id: '2',
      title: 'Nachhaltigkeitskampagne Siemens',
      thumbnail: 'https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '1:30',
      client: 'Siemens AG',
      category: 'Corporate',
      uploadDate: '2024-01-14',
      views: 8920,
      status: 'published',
      description: 'Siemens zeigt Engagement für nachhaltige Technologien',
      tags: ['Siemens', 'Nachhaltigkeit', 'Corporate', 'Technologie']
    },
    {
      id: '3',
      title: 'Adidas Sommerkampagne 2024',
      thumbnail: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '3:12',
      client: 'Adidas',
      category: 'Fashion & Sport',
      uploadDate: '2024-01-13',
      views: 15670,
      status: 'published',
      description: 'Neue Sportkollektion für den Sommer mit internationalen Athleten',
      tags: ['Adidas', 'Sport', 'Fashion', 'Sommer']
    },
    {
      id: '4',
      title: 'Deutsche Bank Finanzberatung',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '4:20',
      client: 'Deutsche Bank',
      category: 'Finance',
      uploadDate: '2024-01-12',
      views: 5430,
      status: 'draft',
      description: 'Erklärungsvideo für moderne Finanzdienstleistungen',
      tags: ['Deutsche Bank', 'Finance', 'Beratung', 'Erklärung']
    },
    {
      id: '5',
      title: 'Lufthansa Reisekampagne',
      thumbnail: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '2:15',
      client: 'Lufthansa',
      category: 'Travel',
      uploadDate: '2024-01-11',
      views: 9840,
      status: 'processing',
      description: 'Entdecke die Welt mit Lufthansa - Premium Reiseerlebnis',
      tags: ['Lufthansa', 'Travel', 'Premium', 'Reisen']
    },
    {
      id: '6',
      title: 'SAP Digitalisierung',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '3:45',
      client: 'SAP SE',
      category: 'Technology',
      uploadDate: '2024-01-10',
      views: 7250,
      status: 'published',
      description: 'Wie SAP Unternehmen bei der digitalen Transformation unterstützt',
      tags: ['SAP', 'Digitalisierung', 'Technology', 'Business']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Filter videos based on search and filters
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesClient = !selectedClient || video.client === selectedClient
      const matchesCategory = !selectedCategory || video.category === selectedCategory
      const matchesStatus = !selectedStatus || video.status === selectedStatus

      return matchesSearch && matchesClient && matchesCategory && matchesStatus
    })
  }, [videos, searchTerm, selectedClient, selectedCategory, selectedStatus])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedClient('')
    setSelectedCategory('')
    setSelectedStatus('')
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Video Filters */}
      <VideoFilters
        videos={videos}
        filteredVideos={filteredVideos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onClearFilters={clearFilters}
      />

      {/* Video Grid */}
      <VideoGrid videos={filteredVideos} />
    </div>
  )
}

export default Dashboard
