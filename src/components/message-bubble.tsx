import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp: Date
  characterName?: string
  characterAvatar?: string
  isTyping?: boolean
}

export function MessageBubble({
  message,
  isUser,
  timestamp,
  characterName,
  characterAvatar,
  isTyping = false
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={characterAvatar} alt={characterName} />
          <AvatarFallback className="text-xs">
            {characterName?.charAt(0) || "AI"}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {!isUser && characterName && (
          <span className="text-xs text-muted-foreground font-medium">
            {characterName}
          </span>
        )}
        
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm break-words",
            isUser
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-muted text-muted-foreground",
            isTyping && "animate-pulse"
          )}
        >
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}