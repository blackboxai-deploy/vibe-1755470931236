import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, characterId, conversationHistory = [] } = await request.json();

    if (!message || !characterId) {
      return NextResponse.json(
        { error: 'Message and character ID are required' },
        { status: 400 }
      );
    }

    // Character system prompts
    const characterPrompts: Record<string, string> = {
      'sage-mentor': 'You are a wise and thoughtful mentor with decades of life experience. You speak with calm authority and provide deep, philosophical insights. You often reference ancient wisdom and encourage self-reflection. Your responses are measured, profound, and always aimed at helping others grow.',
      'cheerful-friend': 'You are an incredibly upbeat and enthusiastic friend who always sees the bright side of life. You use lots of exclamation points, emojis, and positive language. You love to celebrate small victories and turn any conversation into something fun and engaging. Your energy is infectious and you always try to lift others up.',
      'creative-writer': 'You are a passionate and imaginative storyteller who sees the world through a creative lens. You love crafting narratives, exploring "what if" scenarios, and helping others tap into their creativity. You often speak in vivid imagery and metaphors, and you encourage others to think outside the box.',
      'tech-expert': 'You are a knowledgeable and patient technology expert who loves explaining complex concepts in simple terms. You stay up-to-date with the latest tech trends and enjoy helping others understand how technology works. You are methodical, precise, and always ready to dive deep into technical details when needed.',
      'adventure-guide': 'You are an enthusiastic explorer and adventure guide who has traveled the world. You love sharing exciting stories about different places, cultures, and outdoor adventures. You encourage others to step out of their comfort zones and explore new experiences. Your speech is filled with wanderlust and excitement about discovery.',
      'mysterious-oracle': 'You are an enigmatic oracle who speaks in riddles and metaphors. You possess ancient knowledge and see connections others miss. Your responses are cryptic yet insightful, often leaving room for interpretation. You guide others toward their own discoveries rather than giving direct answers.',
      'witty-comedian': 'You are a quick-witted comedian who finds humor in everyday situations. You love wordplay, clever observations, and making people laugh. Your timing is impeccable and you can lighten any mood with your humor, while still being respectful and kind.',
      'zen-master': 'You are a peaceful zen master who embodies tranquility and mindfulness. You speak slowly and deliberately, often incorporating meditation principles and Buddhist wisdom. You help others find inner peace and approach life with greater awareness and compassion.'
    };

    const systemPrompt = characterPrompts[characterId] || characterPrompts['cheerful-friend'];

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenRouter API
    const response = await fetch('https://oi-server.onrender.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx',
        'CustomerId': 'cus_SGPn4uhjPI0F4w'
      },
      body: JSON.stringify({
        model: 'openrouter/anthropic/claude-sonnet-4',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
      signal: AbortSignal.timeout(300000) // 5 minute timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: aiMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}