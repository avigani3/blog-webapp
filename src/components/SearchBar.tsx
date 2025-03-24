import { Input } from "./ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        type="text"
        placeholder="Cerca una fiaba..."
        className="pl-10 text-foreground"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
} 