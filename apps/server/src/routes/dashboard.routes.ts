import { publicProcedure } from "../lib/orpc";
import { ORPCError } from "@orpc/server";
import type { SupabaseClient } from "@supabase/supabase-js";

async function fetchUserLinks(userSupabase: SupabaseClient, userId: string) {
  const { data, error } = await userSupabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user links:", error);
    return [];
  }

  return data || [];
}

async function validateUser(userSupabase: SupabaseClient) {
  const {
    data: { user },
    error,
  } = await userSupabase.auth.getUser();

  if (error || !user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Unauthorized - Please login first",
    });
  }

  return user;
}

async function getValidSession(userSupabase: SupabaseClient) {
  const {
    data: { session },
    error,
  } = await userSupabase.auth.getSession();

  if (error || !session) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Unauthorized - Please login first",
    });
  }

  if (session.expires_at && session.expires_at * 1000 < Date.now()) {
    const { data: refreshData, error: refreshError } =
      await userSupabase.auth.refreshSession();

    if (refreshError || !refreshData.session) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "Session expired and refresh failed - Please login again",
      });
    }

    return refreshData.session;
  }

  return session;
}

export const dashboardRoutes = {
  getDashboard: publicProcedure.handler(async ({ context }) => {
    const { userSupabase } = context;

    const user = await validateUser(userSupabase);
    const session = await getValidSession(userSupabase);

    const avatarUrl = user.user_metadata?.avatar_url ?? null;
    const name = user.user_metadata?.full_name ?? "User";
    const email = user.email;
    const links = await fetchUserLinks(userSupabase, user.id);

    return {
      message: "Login successful! Welcome to your dashboard",
      user: {
        id: user.id,
        email: email,
        name: name,
        avatarUrl: avatarUrl,
        links: links,
      },
      session: {
        accessToken: session.access_token,
        expiresAt: session.expires_at,
      },
    };
  }),

  getProfile: publicProcedure.handler(async ({ context }) => {
    const { userSupabase } = context;

    const user = await validateUser(userSupabase);
    const links = await fetchUserLinks(userSupabase, user.id);

    return {
      profile: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name ?? "User",
        avatarUrl: user.user_metadata?.avatar_url ?? null,
        links: links,
        emailVerified: user.email_confirmed_at !== null,
      },
    };
  }),
};
