import "dotenv/config";
import { z } from "zod";

console.log("🔐 Loading environment variables...");

const serverSchema = z.object({
  NODE_ENV: z.string(),
  CORS_ORIGIN: z.string().optional(),
  SUPABASE_URL: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_ANON_KEY: z.string().min(1),
});

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n");
  _serverEnv.error.issues.forEach((issue) => {
    console.error(issue);
  });
  throw new Error("Invalid environment variables");
}

const {
  NODE_ENV,
  CORS_ORIGIN,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} = _serverEnv.data;

export const env = {
  NODE_ENV,
  CORS_ORIGIN,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
};
console.log("✅ Environment variables loaded");
