import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

export const env = z
  .object({
    AUTH_SERVICE_URL: z.string().url(),
    COMMENT_SERVICE_URL: z.string().url(),
    VOTE_SERVICE_URL: z.string().url(),
    CLIENT_DOMAIN: z.string().url(),
  })
  .parse(process.env);
