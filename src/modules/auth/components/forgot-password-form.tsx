"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="glass-panel">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>We will send you a secure reset link.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <AuthErrorMessage error={resetPasswordMutation.error} />

        {resetPasswordMutation.isSuccess ? (
          <div className="rounded-xl border border-border/60 bg-secondary/60 p-4 text-center text-sm text-foreground">
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

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="font-medium text-foreground hover:underline">
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
