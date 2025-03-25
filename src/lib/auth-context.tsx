import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  favoriteStoryIds: string[]
  toggleFavorite: (storyId: string) => Promise<void>
  isFavorite: (storyId: string) => boolean
  readStoryIds: string[]
  toggleRead: (storyId: string) => Promise<void>
  isRead: (storyId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [favoriteStoryIds, setFavoriteStoryIds] = useState<string[]>([])
  const [readStoryIds, setReadStoryIds] = useState<string[]>([])

  useEffect(() => {
    // Controlla lo stato di autenticazione iniziale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchFavoriteStories(session.user.id)
        fetchReadStories(session.user.id)
      }
    })

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchFavoriteStories(session.user.id)
        fetchReadStories(session.user.id)
      } else {
        setFavoriteStoryIds([])
        setReadStoryIds([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchFavoriteStories = async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('story_id')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching favorites:', error)
      return
    }

    setFavoriteStoryIds(data.map(fav => fav.story_id))
  }

  const fetchReadStories = async (userId: string) => {
    const { data, error } = await supabase
      .from('read_stories')
      .select('story_id')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching read stories:', error)
      return
    }

    setReadStoryIds(data.map(read => read.story_id))
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const toggleFavorite = async (storyId: string) => {
    if (!user) return

    try {
      if (favoriteStoryIds.includes(storyId)) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId)
        setFavoriteStoryIds(prev => prev.filter(id => id !== storyId))
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, story_id: storyId })
        setFavoriteStoryIds(prev => [...prev, storyId])
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  }

  const toggleRead = async (storyId: string) => {
    if (!user) return

    try {
      if (readStoryIds.includes(storyId)) {
        await supabase
          .from('read_stories')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId)
        setReadStoryIds(prev => prev.filter(id => id !== storyId))
      } else {
        await supabase
          .from('read_stories')
          .insert({ user_id: user.id, story_id: storyId })
        setReadStoryIds(prev => [...prev, storyId])
      }
    } catch (error) {
      console.error('Error toggling read status:', error)
      throw error
    }
  }

  const isFavorite = (storyId: string) => {
    return favoriteStoryIds.includes(storyId)
  }

  const isRead = (storyId: string) => {
    return readStoryIds.includes(storyId)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut,
      favoriteStoryIds,
      toggleFavorite,
      isFavorite,
      readStoryIds,
      toggleRead,
      isRead
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 