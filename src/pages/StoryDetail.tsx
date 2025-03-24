import { useParams, Link } from "react-router-dom"
import { StoriesData } from "../types/story"
import storiesData from "../assets/stories.json"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"

export function StoryDetail() {
  const { id } = useParams()
  const story = (storiesData as StoriesData).stories.find(
    (s) => s.id === Number(id)
  )

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alle storie
            </Button>
          </Link>
          {story ? (
            <article className="prose prose-lg dark:prose-invert mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-foreground">{story.title}</h1>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg">
                <p className="whitespace-pre-line">{story.content}</p>
              </div>
            </article>
          ) : (
            <article className="prose prose-lg dark:prose-invert mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-foreground">Storia non trovata</h1>
            </article>
          )}
        </div>
      </div>
    )
} 