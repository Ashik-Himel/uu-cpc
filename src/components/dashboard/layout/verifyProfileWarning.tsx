"use client";

import { useUserStore } from "@/lib/userStore";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export default function VerifyProfileWarning() {
  const token = Cookies.get("token");
  const verifyWarnDisappear = useUserStore(
    (state) => state.verifyWarnDisappear
  );
  const setVerifyWarnDisappear = useUserStore(
    (state) => state.setVerifyWarnDisappear
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [getButtonDisabled, setGetButtonDisabled] = useState(false);

  const handleGetEmail = async () => {
    setGetButtonDisabled(true);

    const res = await fetch(`${serverDomain}/api/auth/verify-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();

    if (result?.ok) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message || "An error occurred");
    }
    setGetButtonDisabled(false);
    setIsEditDialogOpen(false);
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${serverDomain}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result?.user;
    },
  });
  if (isLoading || user?.verified || verifyWarnDisappear) return null;

  return (
    <div className="bg-primary text-white dark:text-black font-medium p-4 flex justify-between items-center gap-4">
      <div className="flex-1 text-center">
        <span className="leading-[2.3]">
          Your account is not verified. Verify your account now.{" "}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-black dark:text-white ml-2"
              >
                Verify Now
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-48px)] sm:max-w-[450px] rounded-lg">
              <DialogHeader className="text-left">
                <DialogTitle>Get Verification Email</DialogTitle>
              </DialogHeader>
              <p className="max-w-[360px]">
                Get the verification email to your email address to verify your
                account.
              </p>
              <DialogFooter className="flex-row-reverse">
                <div className="flex justify-center items-center gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button onClick={handleGetEmail} disabled={getButtonDisabled}>
                    {getButtonDisabled ? "Sending..." : "Get Email"}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </div>
      <X
        className="cursor-pointer select-none"
        onClick={() => setVerifyWarnDisappear(true)}
      />
    </div>
  );
}
