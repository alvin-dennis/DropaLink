import { publicProcedure } from "../lib/orpc";
import { ORPCError } from "@orpc/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(1).optional(),
  provider: z.enum(["google", "email"]).optional(),
});

const registerSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  provider: z.enum(["google", "email"]).optional(),
});

const callbackSchema = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
});

export const authRoutes = {
  getUser: publicProcedure.handler(async ({ context }) => {
    const { userSupabase } = context;
    const { data, error } = await userSupabase.auth.getUser();
    if (error) {
      throw new ORPCError("BAD_REQUEST", {
        message: error.message,
      });
    }
    return data;
  }),

  logout: publicProcedure.handler(async ({ context }) => {
    const { userSupabase } = context;
    const { error } = await userSupabase.auth.signOut();
    if (error) {
      throw new ORPCError("BAD_REQUEST", {
        message: error.message,
      });
    }
    return { message: "Logged out successfully" };
  }),

  login: publicProcedure
    .input(loginSchema)
    .handler(async ({ input, context }) => {
      const { userSupabase, honoContext } = context;
      const { email, password, provider } = input;

      if (provider === "google") {
        const { data, error } = await userSupabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${
              honoContext.req.header("origin") || "http://localhost:3000"
            }/auth/callback`,
          },
        });
        if (error) {
          throw new ORPCError("BAD_REQUEST", {
            message: error.message,
          });
        }
        return { url: data.url };
      }

      if (!email || !password) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Email and password are required",
        });
      }

      const { data, error } = await userSupabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new ORPCError("BAD_REQUEST", {
          message: error.message,
        });
      }

      return data;
    }),

  register: publicProcedure
    .input(registerSchema)
    .handler(async ({ input, context }) => {
      const { userSupabase, honoContext } = context;
      const { email, password, provider } = input;

      if (provider === "google") {
        const { data, error } = await userSupabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${
              honoContext.req.header("origin") || "http://localhost:3000"
            }/auth/callback`,
          },
        });

        if (error) {
          throw new ORPCError("BAD_REQUEST", {
            message: error.message,
          });
        }

        return { url: data.url };
      }

      if (!email || !password) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Email and password are required",
        });
      }

      const { data, error } = await userSupabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new ORPCError("BAD_REQUEST", {
          message: error.message,
        });
      }

      return data;
    }),

  callback: publicProcedure
    .input(callbackSchema)
    .handler(async ({ input, context }) => {
      const { userSupabase } = context;
      const { code, error } = input;

      if (error) {
        throw new ORPCError("BAD_REQUEST", {
          message: error,
        });
      }

      if (!code) {
        throw new ORPCError("BAD_REQUEST", {
          message: "Authorization code is required",
        });
      }

      const { data, error: authError } =
        await userSupabase.auth.exchangeCodeForSession(code);

      if (authError) {
        throw new ORPCError("BAD_REQUEST", {
          message: authError.message,
        });
      }

      return data;
    }),
};
