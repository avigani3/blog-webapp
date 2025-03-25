import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { useAuth } from "../lib/auth-context"

interface SearchBarProps {
  onSearch: (query: string) => void
  favoritesOnly: boolean
  onFavoritesChange: (value: boolean) => void
}

export function SearchBar({ onSearch, favoritesOnly, onFavoritesChange }: SearchBarProps) {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca una storia..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {user && (
        <div className="flex items-center space-x-2 justify-end">
          <Checkbox 
            id="favorites" 
            checked={favoritesOnly}
            onCheckedChange={(checked) => onFavoritesChange(checked as boolean)}
          />
          <Label htmlFor="favorites">Mostra solo i preferiti</Label>
        </div>
      )}
    </div>
  )
} 