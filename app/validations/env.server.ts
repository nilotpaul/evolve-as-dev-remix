import { configDotenv } from 'dotenv';
import { z } from 'zod';

configDotenv({ path: './.dev.vars' });

const serverEnvSchema = z.object({
  AUTH_SERVICE_URL: z.string().url(),
  COMMENT_SERVICE_URL: z.string().url(),
  VOTE_SERVICE_URL: z.string().url(),
  CLIENT_DOMAIN: z.string().url(),
});

export const cloudflareEnv = (env: Env) => {
  return serverEnvSchema.parse(env);
};

export const serverEnv = serverEnvSchema.parse(process.env);
