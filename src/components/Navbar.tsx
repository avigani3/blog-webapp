import { Book } from "lucide-react"
import { AuthButtons } from "./AuthButtons"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6" />
          <span className="text-lg font-semibold">Storie per Bambini</span>
        </div>
        <div className="flex items-center space-x-4">
          <AuthButtons />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
} 