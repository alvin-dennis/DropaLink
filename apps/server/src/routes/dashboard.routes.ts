import { Hono } from "hono";
import { userSupabaseMiddleware } from "../middleware/auth.middleware";

const dashboardRoutes = new Hono();

dashboardRoutes.use(userSupabaseMiddleware());

dashboardRoutes.get("/", async (c) => {
  const userSupabase = c.get("userSupabase");

  const {
    data: { session },
    error,
  } = await userSupabase.auth.getSession();

  if (error || !session) {
    return c.json({ error: "Unauthorized - Please login first" }, 401);
  }

  const user = session.user;
  const avatarUrl = user.user_metadata?.avatar_url ?? null;
  const name = user.user_metadata?.full_name ?? user.email ?? "User";
  const email = user.email;

  return c.json({
    message: "Login successful! Welcome to your dashboard",
    user: {
      id: user.id,
      email: email,
      name: name,
      avatarUrl: avatarUrl,
      lastSignIn: user.last_sign_in_at,
      createdAt: user.created_at,
    },
    session: {
      accessToken: session.access_token,
      expiresAt: session.expires_at,
    },
  });
});

dashboardRoutes.get("/profile", async (c) => {
  const userSupabase = c.get("userSupabase");

  const {
    data: { session },
    error,
  } = await userSupabase.auth.getSession();

  if (error || !session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const user = session.user;
  return c.json({
    profile: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name ?? user.email ?? "User",
      avatarUrl: user.user_metadata?.avatar_url ?? null,
      provider: user.app_metadata?.provider ?? "email",
      emailVerified: user.email_confirmed_at !== null,
      lastSignIn: user.last_sign_in_at,
      createdAt: user.created_at,
    },
  });
});

export default dashboardRoutes;
