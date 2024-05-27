import { z } from 'zod';

const serverEnvSchema = z.object({
  AUTH_SERVICE_URL: z.string().url(),
  COMMENT_SERVICE_URL: z.string().url(),
  VOTE_SERVICE_URL: z.string().url(),
  CLIENT_DOMAIN: z.string().url(),
});

export const getEnv = (env: Env | ProcessEnv) => {
  return serverEnvSchema.parse(env);
};
