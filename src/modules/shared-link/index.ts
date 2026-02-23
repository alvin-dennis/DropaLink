import type { SupabaseClient } from "@supabase/supabase-js";

export type LinkRecord = {
  id: string;
  slug: string;
  title?: string | null;
  content: string;
  is_public: boolean;
  expires_at?: string | null;
  max_views?: number | null;
  view_count: number;
  one_time: boolean;
  revoked: boolean;
  created_by?: string | null;
  created_at: string;
};

function makeSlug(len = 10) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function createLink(
  supabase: SupabaseClient,
  payload: {
    title?: string | null;
    content: string;
    is_public?: boolean;
    expires_in_minutes?: number | null;
    max_views?: number | null;
    one_time?: boolean;
  },
) {
  const slug = makeSlug();
  const expires_at = payload.expires_in_minutes
    ? new Date(Date.now() + payload.expires_in_minutes * 60 * 1000).toISOString()
    : null;

  const insert = {
    slug,
    title: payload.title ?? null,
    content: payload.content,
    is_public: !!payload.is_public,
    expires_at,
    max_views: payload.max_views ?? null,
    view_count: 0,
    one_time: !!payload.one_time,
    revoked: false,
  } as any;

  const { data, error } = await supabase.from("links").insert(insert).select().single();
  if (error) throw error;
  return data;
}

export async function getLinkBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function incrementLinkView(supabase: SupabaseClient, slug: string) {
  const { data: row, error: readError } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();
  if (readError) throw readError;
  if (!row) return null;

  const now = new Date();
  if (row.revoked) return { status: "revoked" };
  if (row.expires_at && now > new Date(row.expires_at)) return { status: "expired" };
  if (row.max_views !== null && row.view_count >= (row.max_views ?? 0))
    return { status: "exhausted" };

  const newCount = row.view_count + 1;
  const shouldRevoke = row.one_time || (row.max_views !== null && newCount >= (row.max_views ?? 0));

  const { data: updated, error: updateError } = await supabase
    .from("links")
    .update({ view_count: newCount, revoked: shouldRevoke })
    .eq("slug", slug)
    .select()
    .single();

  if (updateError) throw updateError;
  return { status: "ok", link: updated };
}

export async function revokeLink(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from("links")
    .update({ revoked: true })
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listLinksByUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
