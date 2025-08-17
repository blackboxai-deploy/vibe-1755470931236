interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class AIClient {
  private readonly baseURL = 'https://oi-server.onrender.com/chat/completions';
  private readonly customerId = 'cus_SGPn4uhjPI0F4w';
  private readonly timeout = 300000; // 5 minutes

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xxx',
          'CustomerId': this.customerId,
        },
        body: JSON.stringify({
          model: 'openrouter/anthropic/claude-sonnet-4',
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI model');
      }

      return data.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }
}

export const aiClient = new AIClient();