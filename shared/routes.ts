import { z } from 'zod';
import { insertRsvpSchema, rsvps } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  rsvps: {
    create: {
      method: 'POST' as const,
      path: '/api/rsvps' as const,
      input: insertRsvpSchema,
      responses: {
        201: z.custom<typeof rsvps.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/rsvps' as const,
      responses: {
        200: z.array(z.custom<typeof rsvps.$inferSelect>()),
      },
    },
  },
};
