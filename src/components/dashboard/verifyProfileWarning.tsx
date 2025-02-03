"use client";

import { useUserStore } from "@/lib/userStore";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function VerifyProfileWarning() {
  const token = Cookies.get("token");
  const verifyWarnDisappear = useUserStore(
    (state) => state.verifyWarnDisappear
  );
  const setVerifyWarnDisappear = useUserStore(
    (state) => state.setVerifyWarnDisappear
  );

  const handleGetEmail = async () => {
    const res = await fetch(`${serverDomain}/api/auth/verify-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    toast.success(result?.message || "An error occurred");
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
    <div className="bg-primary/5 text-primary font-medium p-4 flex justify-between items-center gap-4">
      <div className="flex-1 text-center">
        <span>
          Your account is not verified. Verify your account now.{" "}
          <Dialog>
            <DialogTrigger asChild>
              <span className="font-semibold underline text-nowrap cursor-pointer select-none">
                Verify Now
              </span>
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
                  <DialogClose asChild>
                    <Button onClick={handleGetEmail}>Get Email</Button>
                  </DialogClose>
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
