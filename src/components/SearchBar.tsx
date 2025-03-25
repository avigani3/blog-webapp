import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { useAuth } from "../lib/auth-context"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string, favoritesOnly: boolean) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const { user } = useAuth()
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value, favoritesOnly)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFavoritesOnly(checked)
    onSearch(searchQuery, checked)
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Cerca una storia..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {user && (
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox 
            id="favorites" 
            checked={favoritesOnly}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="favorites" className="text-sm text-muted-foreground">
            Mostra solo i preferiti
          </Label>
        </div>
      )}
    </div>
  )
} 