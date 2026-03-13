"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore, type UserRole } from "@/lib/auth-store";
import api from "@/lib/api-client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await api.post("/auth/login", values);
      const { user, token } = res.data as {
        user: { id: string; name: string; email: string; role: UserRole };
        token: string;
      };
      setAuth(user, token);

      toast.success("Welcome back", {
        description: `Signed in as ${user.role}`,
      });

      switch (user.role) {
        case "STUDENT":
          router.push("/student/dashboard");
          break;
        case "FACULTY":
          router.push("/faculty/dashboard");
          break;
        case "MASTER":
          router.push("/master/dashboard");
          break;
        default:
          router.push("/");
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/80 text-zinc-50 shadow-2xl">
        <CardHeader className="mb-4 flex flex-col space-y-2">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Sign in to Campus ERP
          </CardTitle>
          <p className="text-xs text-zinc-400">
            Unified dashboards for students, faculty, and masters.
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@institute.edu"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-[11px] text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-[11px] text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

