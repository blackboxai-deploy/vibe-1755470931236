import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { characters, Character } from '@/lib/characters'

function CharacterCard({ character }: { character: Character }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={character.avatar} alt={character.name} />
            <AvatarFallback>{character.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{character.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {character.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm mb-4 line-clamp-3">
          {character.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mb-4">
          {character.personality.slice(0, 3).map((trait: string) => (
            <Badge key={trait} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>
        <Link href={`/chat/${character.id}`}>
          <Button className="w-full group-hover:bg-primary/90 transition-colors">
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function CharacterGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <div className="text-center py-12 px-4">
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Character AI
        </h1>
      </div>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Chat with AI characters, each with unique personalities and expertise. 
        Discover engaging conversations and explore different perspectives.
      </p>
      <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          {characters.length} Characters
        </div>
        <div className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2" />
          Unlimited Chats
        </div>
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />
          AI Powered
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Featured Characters</h2>
          <p className="text-muted-foreground">
            Choose a character to start your conversation
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-muted rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-3 bg-muted rounded w-4/6" />
                  </div>
                  <div className="h-10 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        }>
          <CharacterGrid />
        </Suspense>
      </main>
    </div>
  )
}