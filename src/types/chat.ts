export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  category: string;
  tags: string[];
  personality: string[];
  backgroundColor?: string;
  accentColor?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  characterId?: string;
}

export interface ChatSession {
  id: string;
  characterId: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
}

export interface ChatRequest {
  message: string;
  characterId: string;
  sessionId?: string;
  messageHistory?: Message[];
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  success: boolean;
  error?: string;
}

export interface AIModelConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  timeout: number;
}

export interface OpenRouterRequest {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type ChatStatus = 'idle' | 'typing' | 'sending' | 'error';

export interface ChatState {
  messages: Message[];
  status: ChatStatus;
  error?: string;
  isLoading: boolean;
}