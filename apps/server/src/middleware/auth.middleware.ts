import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { supabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context, MiddlewareHandler } from "hono";
import { setCookie } from "hono/cookie";
import { env as serverEnv } from "@/config/env";

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient;
    userSupabase: SupabaseClient;
  }
}

export const getSupabase = (c: Context) => {
  return c.get("supabase");
};

export const getUserSupabase = (c: Context) => {
  return c.get("userSupabase");
};

export const supabaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    c.set("supabase", supabase);
    await next();
  };
};

export const userSupabaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const userSupabase = createServerClient(
      serverEnv.SUPABASE_URL,
      serverEnv.SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(c.req.header("Cookie") ?? "").map(
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
              setCookie(c, name, value, options)
            );
          },
        },
      }
    );

    c.set("userSupabase", userSupabase);
    await next();
  };
};
