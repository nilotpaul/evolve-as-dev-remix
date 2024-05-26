import { z } from 'zod';

export const clientEnv = z
  .object({
    VITE_AUTH_SERVICE_URL: z.string().url(),
    VITE_COMMENT_SERVICE_URL: z.string().url(),
    VITE_VOTE_URL: z.string().url(),
    VITE_CLIENT_DOMAIN: z.string().url(),
  })
  .parse(import.meta.env);
