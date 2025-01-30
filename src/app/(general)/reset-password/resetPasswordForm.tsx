"use client";

import resetPasswordImg from "@/assets/images/reset-password.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;
    const reTypedPassword = (
      form.elements.namedItem("reTypedPassword") as HTMLInputElement
    ).value;

    if (newPassword.length < 8) {
      setSubmitDisabled(false);
      return toast.error("Password must be at least 8 characters!");
    } else if (!/[A-Z]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error("At least one uppercase character required!");
    } else if (!/[0-9]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error("At least one number required!");
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setSubmitDisabled(false);
      return toast.error("At least one special character required!");
    }
    if (newPassword !== reTypedPassword) {
      setSubmitDisabled(false);
      return toast.error("Passwords do not match!");
    }

    const res = await fetch(
      `${serverDomain}/api/auth/reset-password?token=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, reTypedPassword }),
      }
    );
    const result = await res.json();

    if (result.ok) {
      toast.success(result?.message);
      router.push("/login");
    } else {
      setSubmitDisabled(false);
      toast.error(result?.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-muted md:block">
            <Image
              src={resetPasswordImg}
              alt="Reset Password Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
            />
          </div>
          <form
            className="p-6 md:p-8"
            autoComplete="true"
            onSubmit={handleResetPassword}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Submit your new password
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reTypedPassword">Confirm Password</Label>
                <Input id="reTypedPassword" type="text" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
