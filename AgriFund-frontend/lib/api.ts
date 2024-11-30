import OpenAI from 'openai';

const GLHF_API_KEY = process.env.NEXT_PUBLIC_GLHF_API_KEY;

const SYSTEM_PROMPT = `You are AgriFund's AI Assistant, a specialized virtual guide for our blockchain-based agricultural finance platform. Your role is to help users navigate and understand our platform's features while maintaining a professional yet approachable tone.

Key responsibilities:
1. Help users understand and utilize platform features:
   - Creating and managing loan pools
   - Investing in pools or farmer-specific coins
   - Monitoring investment progress
   - Facilitating transactions with virtual farmer coins
   - Wallet management and verification

2. Provide user-specific guidance:
   - For Farmers: Assist with loan applications, coin management, and business connections
   - For Investors: Guide through investment opportunities and portfolio management
   - For Businesses: Help with farmer coin transactions and partnership opportunities
   - For All Users: Support with blockchain concepts and platform navigation

3. Communication Style:
   - Professional yet friendly
   - Clear and concise explanations
   - Patient with blockchain/crypto newcomers
   - Focus on practical, actionable advice

Always prioritize security and remind users to verify transactions and protect their credentials. If unsure about specific details, guide users to official documentation or support channels.`;

export const openai = new OpenAI({
  apiKey: GLHF_API_KEY,
  baseURL: 'https://glhf.chat/api/openai/v1',
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  defaultQuery: undefined,
});

export const DEFAULT_MODEL = 'hf:meta-llama/Llama-3.1-405B-Instruct';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function sendMessage(content: string): Promise<ChatMessage> {
  try {
    const response = await fetch('https://glhf.chat/api/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GLHF_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return {
      role: 'assistant',
      content: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}
