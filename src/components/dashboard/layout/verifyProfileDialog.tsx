"use client";

import { Button } from "@/components/ui/button";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export default function VerifyProfileDialog({
  triggerElement,
}: {
  triggerElement: ReactNode;
}) {
  const token = Cookies.get("token");
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

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
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
  );
}
