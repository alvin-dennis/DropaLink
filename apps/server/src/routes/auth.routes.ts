import { Hono } from "hono";
import { userSupabaseMiddleware } from "../middleware/auth.middleware";

const authRoutes = new Hono();

authRoutes.use(userSupabaseMiddleware());

authRoutes.get("/user", async (c) => {
  const userSupabase = c.get("userSupabase");
  const { data, error } = await userSupabase.auth.getUser();
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json(data);
});

authRoutes.post("/logout", async (c) => {
  const userSupabase = c.get("userSupabase");
  const { error } = await userSupabase.auth.signOut();
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json({ message: "Logged out successfully" });
});

authRoutes.post("/login", async (c) => {
  const userSupabase = c.get("userSupabase");
  const { email, password, provider } = await c.req.json();
  if (provider === "google") {
    const { data, error } = await userSupabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          c.req.header("origin") || "http://localhost:3000"
        }/auth/callback`,
      },
    });
    if (error) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ url: data.url });
  }
  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  const { data, error } = await userSupabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json(data);
});

authRoutes.post("/register", async (c) => {
  const userSupabase = c.get("userSupabase");
  const { email, password, provider } = await c.req.json();
  if (provider === "google") {
    const { data, error } = await userSupabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          c.req.header("origin") || "http://localhost:3000"
        }/auth/callback`,
      },
    });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json({ url: data.url });
  }
  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }
  const { data, error } = await userSupabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  return c.json(data);
});

authRoutes.get("/callback", async (c) => {
  const userSupabase = c.get("userSupabase");
  const code = c.req.query("code");
  const error = c.req.query("error");

  if (error) {
    return c.json({ error: error }, 400);
  }

  if (!code) {
    return c.json({ error: "Authorization code is required" }, 400);
  }

  const { data, error: authError } =
    await userSupabase.auth.exchangeCodeForSession(code);

  if (authError) {
    return c.json({ error: authError.message }, 400);
  }

  return c.json(data);
});

export default authRoutes;
