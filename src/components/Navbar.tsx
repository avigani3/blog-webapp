import { Home } from "lucide-react"
import { AuthButtons } from "./AuthButtons"
import { ModeToggle } from "./mode-toggle"
import { RandomStoryButton } from "./RandomStoryButton"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/blog-webapp" className="hover:opacity-80">
            <Home className="h-6 w-6" />
          </Link>
          <RandomStoryButton />
        </div>
        <div className="flex items-center space-x-4">
          <AuthButtons />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
} 