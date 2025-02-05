"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serverDomain } from "@/lib/variables";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitDisabled(true);

    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("userEmail") as HTMLInputElement
    ).value.trim();

    if (!email.endsWith("@uttarauniversity.edu.bd")) {
      setSubmitDisabled(false);
      return toast.error("Please use your Uttara University email address");
    }

    const res = await fetch(`${serverDomain}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await res.json();

    if (result.ok) {
      form.reset();
      setSubmitDisabled(false);
      setIsEditDialogOpen(false);
      toast.success(result.message);
    } else {
      setSubmitDisabled(false);
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer select-none ml-auto text-sm underline-offset-2 hover:underline">
          Forgot your password?
        </span>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-48px)] sm:max-w-[425px] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Forgot Password?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleForgotPassword}>
          <div className="grid gap-2 mb-4">
            <Label htmlFor="userEmail">Email</Label>
            <Input
              id="userEmail"
              type="email"
              placeholder="****@uttarauniversity.edu.bd"
              required
            />
          </div>
          <DialogFooter className="flex-row sm:justify-start">
            <Button type="submit" disabled={submitDisabled}>
              {submitDisabled ? "Processing..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
