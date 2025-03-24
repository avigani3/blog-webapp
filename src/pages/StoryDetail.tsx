import { useParams, Link } from "react-router-dom"
import { Story } from "../types/story"
import stories from "../assets/stories.json"
import { Button } from "../components/ui/button"
import { StoryActions } from "../components/StoryActions"
import { ArrowLeft } from "lucide-react"

export function StoryDetail() {
  const { id } = useParams()
  const story = (stories as { stories: Story[] }).stories.find((s: Story) => s.id === id)

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Storia non trovata</h1>
        <Link to="/">
          <Button>Torna alla lista</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold">{story.title}</h1>
        <StoryActions storyId={story.id} />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {story.content.split('\n').map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/">
          <Button><ArrowLeft className="mr-2 h-4 w-4" />Torna alla lista</Button>
        </Link>
      </div>
    </div>
  )
} 