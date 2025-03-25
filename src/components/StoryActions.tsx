import { Button } from "./ui/button"
import { Bookmark, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { AuthButtons } from "./AuthButtons"
import { useAuth } from "../lib/auth-context"

interface StoryActionsProps {
  storyId: string
}

export function StoryActions({ storyId }: StoryActionsProps) {
  const { user, isFavorite, toggleFavorite, isRead, toggleRead } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      setShowLogin(true)
      return
    }
  }

  const handleFavoriteClick = async () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    try {
      await toggleFavorite(storyId)
      toast.success(isFavorite(storyId) ? "Rimosso dai preferiti" : "Aggiunto ai preferiti")
    } catch (error) {
      toast.error("Si è verificato un errore durante l'operazione")
    }
  }

  const handleReadClick = async () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    try {
      await toggleRead(storyId)
      toast.success(isRead(storyId) ? "Segnato come letto" : "Rimosso dalle storie lette")
    } catch (error) {
      toast.error("Si è verificato un errore durante l'operazione")
    }
  }

  return (
    <>
      <div className="flex gap-2" onClick={handleIconClick}>
        <Button
          variant="ghost"
          size="icon"
          className={isFavorite(storyId) ? "text-yellow-500" : "text-muted-foreground"}
          onClick={handleFavoriteClick}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={isRead(storyId) ? "text-green-500" : "text-muted-foreground"}
          onClick={handleReadClick}
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      </div>
      {showLogin && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            e.stopPropagation()
            setShowLogin(false)
          }}
        >
          <div 
            className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-sm mx-auto flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4 text-center">Accedi per continuare</h2>
              <AuthButtons onClose={() => setShowLogin(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
} 