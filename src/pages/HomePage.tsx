import { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar"
import { StoryCard } from "../components/StoryCard"
import { Story } from "../types/story"
import stories from "../assets/stories.json"
import { useAuth } from "../lib/auth-context"

export function HomePage() {
  const [storiesList, setStoriesList] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { user, favoriteStoryIds } = useAuth()

  useEffect(() => {
    setStoriesList((stories as { stories: Story[] }).stories)
  }, [])

  useEffect(() => {
    let filtered = [...storiesList]

    // Applica il filtro dei preferiti
    if (favoritesOnly && user) {
      filtered = filtered.filter(story => favoriteStoryIds.includes(story.id))
    }

    // Applica la ricerca testuale
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(query) || 
        story.content.toLowerCase().includes(query)
      )
    }

    setFilteredStories(filtered)
  }, [storiesList, searchQuery, favoritesOnly, favoriteStoryIds, user])

  const handleSearch = (query: string, favoritesOnly: boolean) => {
    setSearchQuery(query)
    setFavoritesOnly(favoritesOnly)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-fredoka font-bold text-center mb-8 animate-bounce-in">Fiabe per Bambini</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </main>
  )
} 