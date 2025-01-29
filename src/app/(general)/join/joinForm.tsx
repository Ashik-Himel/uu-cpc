"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/userStore";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function JoinForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const studentId = parseInt(
      (form.elements.namedItem("studentId") as HTMLInputElement).value
    );
    const batch = parseInt(
      (form.elements.namedItem("batch") as HTMLInputElement).value
    );
    const section = (
      form.elements.namedItem("section") as HTMLInputElement
    ).value
      .trim()
      .toUpperCase();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const reTypedPassword = (
      form.elements.namedItem("reTypedPassword") as HTMLInputElement
    ).value;

    if (!email.includes("@uttarauniversity.edu.bd")) {
      setSubmitDisabled(false);
      return toast.error("Please use your Uttara University email address");
    }

    if (password.length < 8) {
      setSubmitDisabled(false);
      return toast.error("Password must be at least 8 characters!");
    } else if (!/[A-Z]/.test(password)) {
      setSubmitDisabled(false);
      return toast.error("At least one uppercase character required!");
    } else if (!/[0-9]/.test(password)) {
      setSubmitDisabled(false);
      return toast.error("At least one number required!");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setSubmitDisabled(false);
      return toast.error("At least one special character required!");
    }
    if (password !== reTypedPassword) {
      setSubmitDisabled(false);
      return toast.error("Passwords do not match!");
    }

    const newMember = { name, email, studentId, batch, section, password };
    const res = await fetch(`${serverDomain}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newMember),
    });
    const result = await res.json();

    if (result.ok) {
      toast.success("Congratulations! You are now a member of UU CPC!");
      setUser(result.user);
      if (result.user.role === "super-admin" || result.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (result.user.role === "member") {
        router.replace("/member/dashboard");
      }
    } else {
      setSubmitDisabled(false);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" name="joinForm" onSubmit={handleJoin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Join UU CPC Club!</h1>
                <p className="text-balance text-muted-foreground">
                  Fill up the information to below
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
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
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="number"
                    min={1000000000}
                    max={9999999999}
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="batch">Batch</Label>
                    <Input
                      id="batch"
                      type="number"
                      min={10}
                      max={99}
                      placeholder="12"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="section">
                      Section{" "}
                      <span className="text-primary italic">(optional)</span>
                    </Label>
                    <Input
                      id="section"
                      type="text"
                      maxLength={1}
                      placeholder="A"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reTypedPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="reTypedPassword"
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
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                Join Club
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
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
