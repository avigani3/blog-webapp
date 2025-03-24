import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { StoryDetail } from "./pages/StoryDetail"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryDetail />} />
      </Routes>
    </div>
  )
}

export default App
