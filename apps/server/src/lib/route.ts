import { z } from "zod";
import { publicProcedure } from "./orpc";

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

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),

  auth: {
    getUser: publicProcedure.handler(async ({ context: _context }) => {

      return {
        message: "Auth getUser endpoint - implement with proper auth context",
      };
    }),

    login: publicProcedure
      .input(loginSchema)
      .handler(async ({ input, context: _context }) => {
        const { email, password, provider } = input;

        if (provider === "google") {
          return {
            message: "Google OAuth login - implement with Supabase",
            redirectUrl: "implementation needed",
          };
        }

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        return {
          message: "Email/password login - implement with Supabase",
          email: email,
        };
      }),

    register: publicProcedure
      .input(registerSchema)
      .handler(async ({ input, context: _context }) => {
        const { email, password, provider } = input;

        if (provider === "google") {
          return {
            message: "Google OAuth registration - implement with Supabase",
            redirectUrl: "implementation needed",
          };
        }

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        return {
          message: "Email/password registration - implement with Supabase",
          email: email,
        };
      }),

    logout: publicProcedure.handler(async ({ context: _context }) => {
      return {
        message: "Logout - implement with Supabase auth",
      };
    }),

    callback: publicProcedure
      .input(callbackSchema)
      .handler(async ({ input, context: _context }) => {
        const { code, error } = input;

        if (error) {
          throw new Error(error);
        }

        if (!code) {
          throw new Error("Authorization code is required");
        }

        return {
          message: "OAuth callback - implement code exchange with Supabase",
          code: code,
        };
      }),
  },

  dashboard: {
    getDashboard: publicProcedure.handler(async ({ context: _context }) => {
      return {
        message: "Dashboard data - implement with auth session",
        user: {
          id: "placeholder",
          email: "user@example.com",
          name: "User",
          avatarUrl: null,
          lastSignIn: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
        session: {
          accessToken: "placeholder",
          expiresAt: Date.now() + 3600000,
        },
      };
    }),

    getProfile: publicProcedure.handler(async ({ context: _context }) => {
      return {
        profile: {
          id: "placeholder",
          email: "user@example.com",
          name: "User",
          avatarUrl: null,
          provider: "email",
          emailVerified: false,
          lastSignIn: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      };
    }),
  },
};

export type AppRouter = typeof appRouter;
