import { z } from 'zod';

export const loginWithProviderResponseSchema = z.object({
  url: z.string().url(),
});

export type LoginWithProviderResponse = z.infer<typeof loginWithProviderResponseSchema>;
