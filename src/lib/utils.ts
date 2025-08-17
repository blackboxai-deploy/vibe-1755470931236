import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ')
}

export function isValidMessage(message: string): boolean {
  const trimmed = message.trim()
  return trimmed.length > 0 && trimmed.length <= 2000
}

export function getCharacterTheme(characterId: string): string {
  const themes: Record<string, string> = {
    'sage-mentor': 'from-purple-500/10 to-indigo-500/10',
    'cheerful-friend': 'from-yellow-500/10 to-orange-500/10',
    'creative-writer': 'from-pink-500/10 to-rose-500/10',
    'tech-expert': 'from-blue-500/10 to-cyan-500/10',
    'adventure-guide': 'from-green-500/10 to-emerald-500/10',
    'mysterious-oracle': 'from-violet-500/10 to-purple-500/10',
    'witty-comedian': 'from-amber-500/10 to-yellow-500/10',
    'fitness-coach': 'from-red-500/10 to-orange-500/10'
  }
  return themes[characterId] || 'from-gray-500/10 to-slate-500/10'
}

export function getCharacterAccent(characterId: string): string {
  const accents: Record<string, string> = {
    'sage-mentor': 'border-purple-500/20 text-purple-600 dark:text-purple-400',
    'cheerful-friend': 'border-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    'creative-writer': 'border-pink-500/20 text-pink-600 dark:text-pink-400',
    'tech-expert': 'border-blue-500/20 text-blue-600 dark:text-blue-400',
    'adventure-guide': 'border-green-500/20 text-green-600 dark:text-green-400',
    'mysterious-oracle': 'border-violet-500/20 text-violet-600 dark:text-violet-400',
    'witty-comedian': 'border-amber-500/20 text-amber-600 dark:text-amber-400',
    'fitness-coach': 'border-red-500/20 text-red-600 dark:text-red-400'
  }
  return accents[characterId] || 'border-gray-500/20 text-gray-600 dark:text-gray-400'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}