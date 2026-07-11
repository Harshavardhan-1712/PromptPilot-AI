// routes/improveRoutes.js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateImproveRequest } from '../middleware/validateImproveRequest.js';
import { improvePrompt } from '../controllers/improveController.js';
import { env } from '../config/env.js';

const router = Router();

const improveLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down and try again shortly.' },
});

router.post('/improve', improveLimiter, validateImproveRequest, improvePrompt);

export default router;
