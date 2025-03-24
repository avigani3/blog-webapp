import { useState } from 'react'
import { Button } from './ui/button'
import { useAuth } from '../lib/auth-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function AuthButtons() {
  const { user, signIn, signUp, signOut } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false) // stato che indica se si è in fase di registrazione o di login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      setOpen(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {user.email}
        </span>
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isSignUp ? 'Registrati' : 'Accedi'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            {isSignUp ? 'Registrati' : 'Accedi'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {isSignUp ? 'Hai già un account?' : 'Non hai un account?'}{' '}
            <button
              type="button"
              className="underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Accedi' : 'Registrati'}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
} 