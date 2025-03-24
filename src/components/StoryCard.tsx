import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Story } from "../types/story"
import { useNavigate } from "react-router-dom"

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate()

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/story/${story.id}`)}
    >
      <div className="relative h-48">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{story.content}</p>
      </CardContent>
    </Card>
  )
} 