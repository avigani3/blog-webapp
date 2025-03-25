import { Button } from "./ui/button"
import { Shuffle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import stories from "../assets/stories.json"

export function RandomStoryButton() {
  const navigate = useNavigate()

  const handleRandomStory = () => {
    const allStories = (stories as { stories: Array<{ id: string }> }).stories
    const randomIndex = Math.floor(Math.random() * allStories.length)
    const randomStory = allStories[randomIndex]
    navigate(`/story/${randomStory.id}`)
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleRandomStory}
      className="gap-2"
    >
      <Shuffle className="h-4 w-4" />
      Storia casuale
    </Button>
  )
} 