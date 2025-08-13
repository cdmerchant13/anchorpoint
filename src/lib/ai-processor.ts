import { OpenAI } from 'openai';

interface ProcessedSubmission {
  processedText: string;
  tags: string[];
}

interface AIError {
  message: string;
  code?: string;
}

export class AIProcessor {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku:free';
    
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is required');
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'X-Title': 'AnchorPoint Resource Library',
      },
      dangerouslyAllowBrowser: false, // Ensure this runs only on the server
    });
  }

  async processSubmission(rawText: string, baseName: string): Promise<ProcessedSubmission> {
    try {
      const prompt = this.createPrompt(rawText, baseName);
      
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-haiku:free',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that processes military spouse resource submissions. Your task is to:
1. Smooth out the tone of the text, removing significant hostility or profanity while preserving the original meaning
2. Fix grammatical errors and improve clarity
3. Generate 4-5 relevant tags to categorize the information, including the base name and one branch tag (Army, Navy, Air Force, Marine Corps, Coast Guard, Space Force)
4. Return the response in valid JSON format with the following structure:
{
  "processedText": "smoothed and improved text",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response from AI model');
      }

      try {
        const parsed = JSON.parse(response);
        return {
          processedText: parsed.processedText || rawText,
          tags: parsed.tags || [baseName]
        };
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Fallback: return original text with basic tags
        return {
          processedText: rawText,
          tags: [baseName, 'general']
        };
      }
    } catch (error) {
      console.error('AI processing error:', error);
      throw new Error(`Failed to process submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createPrompt(rawText: string, baseName: string): string {
    return `Please process the following submission for ${baseName}:

Original text:
"${rawText}"

Please:
1. Smooth out the tone, removing hostility or profanity while preserving meaning
2. Fix grammatical errors
3. Generate 4-5 relevant tags including "${baseName}" and one military branch tag
4. Return in JSON format as specified`;
  }

  async validateTags(tags: string[], baseName: string): Promise<string[]> {
    // Basic validation - ensure base name and branch are included
    const validatedTags = [...tags];
    
    if (!tags.includes(baseName)) {
      validatedTags.push(baseName);
    }
    
    // Check for branch tag
    const branchTags = ['Army', 'Navy', 'Air Force', 'Marine Corps', 'Coast Guard', 'Space Force'];
    const hasBranch = tags.some(tag => 
      branchTags.some(branch => tag.toLowerCase().includes(branch.toLowerCase()))
    );
    
    if (!hasBranch) {
      // Try to infer branch from base name or add general
      validatedTags.push('general');
    }
    
    return validatedTags.slice(0, 5); // Ensure max 5 tags
  }
}
