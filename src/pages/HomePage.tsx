import { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar"
import { StoryCard } from "../components/StoryCard"
import { Story } from "../types/story"
import stories from "../assets/stories.json"
import { useAuth } from "../lib/auth-context"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

const STORIES_PER_PAGE = 12

export function HomePage() {
  const [storiesList, setStoriesList] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { user, favoriteStoryIds } = useAuth()

  useEffect(() => {
    // Ordina le storie in ordine inverso
    const sortedStories = [...(stories as { stories: Story[] }).stories].reverse()
    setStoriesList(sortedStories)
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

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE)

  // Ottieni le storie per la pagina corrente
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE
  const endIndex = startIndex + STORIES_PER_PAGE
  const currentStories = filteredStories.slice(startIndex, endIndex)

  // Reset alla prima pagina quando cambia la ricerca o i filtri
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, favoritesOnly])

  return (
    <main className="container mx-auto px-4">
      <div className="p-6 bg-linear-65 from-yellow-500 to-green-500 rounded-lg mb-8">
        <h1 className="text-4xl font-fredoka font-bold text-center">Fiabe per Bambini</h1>
      </div>
      <SearchBar 
        onSearch={setSearchQuery} 
        favoritesOnly={favoritesOnly}
        onFavoritesChange={setFavoritesOnly}
      />
      {currentStories.length === 0 ? (
        <div className="mt-8 text-center text-xl text-gray-500">
          Oops... non abbiamo trovato nessuna storia.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  )
} 