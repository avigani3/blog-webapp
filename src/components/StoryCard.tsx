import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Story } from "../types/story"
import { useNavigate } from "react-router-dom"
import { StoryActions } from "./StoryActions"

interface StoryCardProps {
  story: Story
}

export function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate()
  // Removed handleCardClick function since we'll use the onClick directly in the Card

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-fredoka text-lg">{story.title}</CardTitle>
          <StoryActions storyId={story.id} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{story.content}</p>
      </CardContent>
    </Card>
  )
} 