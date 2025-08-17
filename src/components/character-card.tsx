import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { Character } from "@/lib/characters"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
            <AvatarImage src={character.avatar} alt={character.name} />
            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
              {character.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
              {character.name}
            </CardTitle>
            <div className="flex flex-wrap gap-1 mb-2">
              {character.personality.map((trait) => (
                <Badge 
                  key={trait} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
          {character.description}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>{character.category}</span>
          </div>
          
          <Link href={`/chat/${character.id}`}>
            <Button 
              size="sm" 
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}