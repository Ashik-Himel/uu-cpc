"use client";

import loginImg from "@/assets/images/login.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/userStore";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ForgotPassword from "./forgotPassword";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!email.endsWith("@uttarauniversity.edu.bd")) {
      setSubmitDisabled(false);
      return toast.error("Please use your Uttara University email address");
    }

    const res = await fetch(`${serverDomain}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();

    if (result.ok) {
      Cookies.set("token", result?.token, {
        secure: true,
        sameSite: "Strict",
        expires: 7,
      });
      setUser({ available: true, role: result?.userRole });
      toast.success("Logged in successfully.");
      if (result?.userRole === "super-admin" || result?.userRole === "admin") {
        router.replace("/admin/dashboard");
      } else if (result?.userRole === "member") {
        router.replace("/member/dashboard");
      }
    } else if (result.message === "User not found") {
      setSubmitDisabled(false);
      toast.error("User not found with this email address.");
    } else if (result.message === "Invalid credentials") {
      setSubmitDisabled(false);
      toast.error("Your credentials are invalid.");
    } else {
      setSubmitDisabled(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            autoComplete="true"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your UU CPC account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="****@uttarauniversity.edu.bd"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <ForgotPassword />
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <div
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-primary cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                {submitDisabled ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/join" className="underline underline-offset-4">
                  Join UU CPC
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={loginImg}
              alt="Login Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mb-4">
        By clicking continue, you agree to our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </div>
    </div>
  );
}
