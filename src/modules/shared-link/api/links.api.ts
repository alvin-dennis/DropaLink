import { createClient } from "@/lib/supabase/client";
import type { CreateLinkValues, LinkRecord } from "../schemas/links.schema";

const supabase = createClient();

export const linksApi = {
  createLink: async (data: CreateLinkValues) => {
    const { data: result, error } = await supabase
      .from("links")
      .insert({
        title: data.title ?? null,
        content: data.content,
        is_public: !!data.is_public,
        expires_at: data.expires_in_minutes
          ? new Date(Date.now() + data.expires_in_minutes * 60 * 1000).toISOString()
          : null,
        max_views: data.max_views ?? null,
        view_count: 0,
        one_time: !!data.one_time,
        revoked: false,
      })
      .select()
      .single();

    if (error) throw error;
    return result as LinkRecord;
  },

  getLinkBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data as LinkRecord | null;
  },

  listLinksByUser: async () => {
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    const user = userRes?.user;
    if (!user) throw new Error("Unauthorized");
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as LinkRecord[];
  },

  revokeLink: async (slug: string) => {
    const { data, error } = await supabase
      .from("links")
      .update({ revoked: true })
      .eq("slug", slug)
      .select()
      .single();
    if (error) throw error;
    return data as LinkRecord;
  },
};
