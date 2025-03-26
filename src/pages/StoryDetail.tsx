import { useParams, Link } from "react-router-dom"
import { Story } from "../types/story"
import stories from "../assets/stories.json"
import { Button } from "../components/ui/button"
import { StoryActions } from "../components/StoryActions"
import { ArrowLeft } from "lucide-react"
import { Helmet } from "react-helmet"

export function StoryDetail() {
  const { id } = useParams()
  const story = (stories as { stories: Story[] }).stories.find((s: Story) => s.id === id)

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Storia non trovata - Fiabe Rilassanti</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-2xl font-bold mb-4 font-fredoka text-transparent bg-clip-text bg-linear-65 from-yellow-300 to-green-300">Storia non trovata</h1>
        <Link to="/">
          <Button className="bg-linear-65 from-green-300 to-yellow-300"><ArrowLeft className="mr-2 h-4 w-4" />Torna alla lista</Button>
        </Link>
      </div>
    )
  }

  // Schema.org markup per la storia
  const storySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.content.substring(0, 160), // Primi 160 caratteri come descrizione
    "keywords": story.tags.join(", "),
    "datePublished": story.date, // Aggiorna con la data reale
    "author": {
      "@type": "Organization",
      "name": "Fiabe Rilassanti"
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Helmet>
        <title>{story.title} - Fiabe Rilassanti</title>
        <meta name="description" content={story.content.substring(0, 160)} />
        <meta name="keywords" content={story.tags.join(", ")} />
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://fiaberilassanti.it/story/${story.id}`} />
        <link rel="canonical" href={`https://fiaberilassanti.it/story/${story.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(storySchema)}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto">
        <header className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold font-fredoka text-transparent bg-clip-text bg-linear-65 from-yellow-300 to-green-300">{story.title}</h1>
          <StoryActions storyId={story.id} />
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {story.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-8">
          <Link to="/">
            <Button className="bg-linear-65 from-green-300 to-yellow-300">
              <ArrowLeft className="mr-2 h-4 w-4" />Torna alla lista
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  )
} 