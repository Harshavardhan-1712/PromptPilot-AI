// services/promptBuilder.js
// Builds the system prompt sent to the LLM based on the requested style.
// Keeping this isolated makes it trivial to add new styles or tune wording
// without touching controller/routing logic.

const BASE_INSTRUCTIONS = `You are an expert Prompt Engineer.

Your task is to rewrite user prompts into clear, detailed, and optimized prompts suitable for modern Large Language Models.

Requirements:
- Preserve original intent.
- Improve clarity.
- Add missing context where helpful.
- Do not change the meaning.
- Make prompts easy for GPT, Claude, and Gemini to understand.
- Return only the optimized prompt without explanations.`;

const STYLE_MODIFIERS = {
  Professional:
    'Style: Professional. Use formal, businesslike language. Favor precision and structure over flourish.',
  Creative:
    'Style: Creative. Use vivid, imaginative language. Encourage expressive and original phrasing while staying on-task.',
  Detailed:
    'Style: Detailed. Expand with specific context, constraints, examples, and edge cases the model should consider. Favor thoroughness.',
  Concise:
    'Style: Concise. Strip to the essential instruction. Keep it as short as possible while remaining unambiguous.',
  'GPT Optimized':
    'Style: GPT Optimized. Structure the prompt using clear directives, numbered steps if helpful, and explicit output-format instructions, following prompt-engineering best practices for GPT-class models.',
};

export const VALID_STYLES = Object.keys(STYLE_MODIFIERS);

export function buildSystemPrompt(style) {
  const modifier = STYLE_MODIFIERS[style] || STYLE_MODIFIERS.Professional;
  return `${BASE_INSTRUCTIONS}\n\n${modifier}`;
}
