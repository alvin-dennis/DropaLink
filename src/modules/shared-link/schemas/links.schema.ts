import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().nullable().optional(),
  content: z.string().min(1, { message: "Content is required" }),
  is_public: z.boolean().optional(),
  expires_in_minutes: z.number().int().positive().nullable().optional(),
  max_views: z.number().int().positive().nullable().optional(),
  one_time: z.boolean().optional(),
});

export const linkRecordSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string().nullable().optional(),
  content: z.string(),
  is_public: z.boolean(),
  expires_at: z.string().nullable().optional(),
  max_views: z.number().nullable().optional(),
  view_count: z.number(),
  one_time: z.boolean(),
  revoked: z.boolean(),
  created_by: z.string().nullable().optional(),
  created_at: z.string(),
});

export type CreateLinkValues = z.infer<typeof createLinkSchema>;
export type LinkRecord = z.infer<typeof linkRecordSchema>;
