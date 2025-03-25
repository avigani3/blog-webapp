import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { StoryDetail } from "./pages/StoryDetail"
import { HomePage } from "./pages/HomePage"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/blog-webapp" element={<HomePage />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Routes>
      </main>
      <Toaster />
    </>
  )
}

export default App
