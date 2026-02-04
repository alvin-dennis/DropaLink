import { createClient } from "@/lib/supabase/client";
import type {
  ForgotPasswordValues,
  LoginValues,
  SignupValues,
  UpdatePasswordValues,
} from "../schemas/auth.schema";

const supabase = createClient();

export const authApi = {
  signInWithEmail: async (data: LoginValues) => {
    const { data: result, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return result;
  },

  signUpWithEmail: async (data: SignupValues) => {
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) throw error;
    return result;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  resetPasswordForEmail: async (data: ForgotPasswordValues) => {
    const { data: result, error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    if (error) throw error;
    return result;
  },

  updateUserPassword: async (data: UpdatePasswordValues) => {
    const { data: result, error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) throw error;
    return result;
  },
};
