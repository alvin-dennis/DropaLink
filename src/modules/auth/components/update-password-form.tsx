"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { useUpdatePassword } from "../hooks/use-update-password";
import { type UpdatePasswordValues, updatePasswordSchema } from "../schemas/auth.schema";
import { AuthErrorMessage } from "./auth-error-message";

export function UpdatePasswordForm() {
  const updatePasswordMutation = useUpdatePassword();
  const router = useRouter();

  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: UpdatePasswordValues) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto p-4 border rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-center">Set New Password</h2>
      <AuthErrorMessage error={updatePasswordMutation.error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={updatePasswordMutation.isPending}>
            {updatePasswordMutation.isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
