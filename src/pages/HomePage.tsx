import { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar"
import { StoryCard } from "../components/StoryCard"
import { Story, StoriesData } from "../types/story"
import storiesData from "../assets/stories.json"

export function HomePage() {
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setStories((storiesData as StoriesData).stories)
    setFilteredStories((storiesData as StoriesData).stories)
  }, [])

  useEffect(() => {
    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredStories(filtered)
  }, [searchQuery, stories])

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Fiabe per Bambini
        </h1>
        <SearchBar onSearch={setSearchQuery} />
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground mt-8">
            Nessuna fiaba trovata
          </p>
        )}
      </div>
    </main>
  )
} 