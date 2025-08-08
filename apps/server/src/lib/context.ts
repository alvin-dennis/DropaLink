import type { Context as HonoContext } from "hono";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { supabase } from "./supabase";
import { env  } from "../config/env";
import { setCookie } from "hono/cookie";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const userSupabase = createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.req.header("Cookie") ?? "").map(
            (cookie) => ({
              name: cookie.name,
              value: cookie.value || "",
            })
          );
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }>
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            setCookie(context, name, value, options)
          );
        },
      },
    }
  );

  return {
    session: null,
    supabase,
    userSupabase,
    honoContext: context,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
