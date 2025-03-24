import { Button } from "./ui/button"
import { Bookmark, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { toast } from "sonner"
import { AuthButtons } from "./AuthButtons"
import { useAuth } from "../lib/auth-context"

interface StoryActionsProps {
  storyId: string
}

export function StoryActions({ storyId }: StoryActionsProps) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (user) {
      checkFavoriteStatus()
      checkReadStatus()
    } else {
      setIsFavorite(false)
      setIsRead(false)
    }
  }, [user, storyId])

  const checkFavoriteStatus = async () => {
    if (!user) return
    const { data } = await supabase
      .from('favorites')
      .select()
      .eq('user_id', user.id)
      .eq('story_id', storyId)
      .single()
    setIsFavorite(!!data)
  }

  const checkReadStatus = async () => {
    if (!user) return
    const { data } = await supabase
      .from('read_stories')
      .select()
      .eq('user_id', user.id)
      .eq('story_id', storyId)
      .single()
    setIsRead(!!data)
  }

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      setShowLogin(true)
      return
    }
  }

  const toggleFavorite = async () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    try {
      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId)
        toast.success("Rimosso dai preferiti")
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, story_id: storyId })
        toast.success("Aggiunto ai preferiti")
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      toast.error("Si è verificato un errore durante l'operazione")
    }
  }

  const toggleRead = async () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    try {
      if (isRead) {
        await supabase
          .from('read_stories')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId)
        toast.success("Rimosso dalle storie lette")
      } else {
        await supabase
          .from('read_stories')
          .insert({ user_id: user.id, story_id: storyId })
        toast.success("Segnato come letto")
      }
      setIsRead(!isRead)
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
          className={isFavorite ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"}
          onClick={toggleFavorite}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={isRead ? "text-green-500" : "text-muted-foreground hover:text-green-500"}
          onClick={toggleRead}
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
            className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Accedi per continuare</h2>
            <AuthButtons onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  )
} 