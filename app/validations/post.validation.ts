import { z } from 'zod';
import { CATEGORIES_ENUM, POST_TAGS_ENUM } from '~/config/site-links';

export const filterPostSchema = z.object({
  category: z.array(z.enum(CATEGORIES_ENUM)).refine((v) => new Set(v).size === v.length, {
    message: 'Duplicates values are not allowed',
  }),
  tag: z.array(z.enum(POST_TAGS_ENUM)).refine((v) => new Set(v).size === v.length, {
    message: 'Duplicates values are not allowed',
  }),
  cursor: z.string().optional(),
});

export type FilterPost = z.infer<typeof filterPostSchema>;
