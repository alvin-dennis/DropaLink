"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "../hooks/use-reset-password";
import { type ForgotPasswordValues, forgotPasswordSchema } from "../schemas/auth.schema";
import { AuthErrorMessage } from "./auth-error-message";

export function ForgotPasswordForm() {
  const resetPasswordMutation = useResetPassword();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <AuthErrorMessage error={resetPasswordMutation.error} />

      {resetPasswordMutation.isSuccess ? (
        <div className="text-green-600 text-center p-4 border border-green-200 rounded">
          Check your email for the password reset link.
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      )}

      <div className="text-center text-sm">
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
