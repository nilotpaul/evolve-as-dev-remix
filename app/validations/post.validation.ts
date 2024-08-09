import { z } from 'zod';
import { CATEGORIES_ENUM, POST_TAGS_ENUM } from '~/config/site-links';

export const filterPostSchema = z.object({
  title: z.string(),
  category: z.array(z.enum(CATEGORIES_ENUM)).refine((v) => new Set(v).size === v.length, {
    message: 'Duplicates values are not allowed',
  }),
  tag: z.array(z.enum(POST_TAGS_ENUM)).refine((v) => new Set(v).size === v.length, {
    message: 'Duplicates values are not allowed',
  }),
  cursor: z.string().optional(),
});

export const createCommentSchema = z.object({
  blogId: z.string().min(2),
  commentText: z.string().min(10, {
    message: 'Must be atleast of 10 character(s)',
  }),
});

export const updateCommentSchema = z.object({
  blogId: z.string().min(2),
  commentId: z.string().min(2),
  commentText: z.string().min(10, {
    message: 'Must be atleast of 10 character(s)',
  }),
});

export type FilterPost = z.infer<typeof filterPostSchema>;
export type CreateComment = z.infer<typeof createCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
