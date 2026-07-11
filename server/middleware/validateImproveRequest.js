// middleware/validateImproveRequest.js
// Validates the body of POST /api/improve before it reaches the controller.

import { VALID_STYLES } from '../services/promptBuilder.js';

const MAX_PROMPT_LENGTH = 4000;

export function validateImproveRequest(req, res, next) {
  const { prompt, style } = req.body || {};

  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required and cannot be empty.' });
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return res.status(400).json({
      error: `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.`,
    });
  }

  if (style !== undefined && !VALID_STYLES.includes(style)) {
    return res.status(400).json({
      error: `Invalid style. Must be one of: ${VALID_STYLES.join(', ')}`,
    });
  }

  req.body.prompt = prompt.trim();
  req.body.style = style || 'Professional';

  next();
}
