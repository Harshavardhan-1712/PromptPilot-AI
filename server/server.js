// server.js
// Entry point. Binds to process.env.PORT for AWS App Runner compatibility.

import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`PromptPilot AI server running on port ${PORT} [${env.NODE_ENV}]`);
});
