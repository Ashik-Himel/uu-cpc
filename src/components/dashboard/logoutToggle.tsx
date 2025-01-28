"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/lib/userStore";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export default function LogoutToggle({
  triggerElement,
}: {
  triggerElement: ReactNode;
}) {
  const router = useRouter();
  const token = Cookies.get("token");
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = async () => {
    const res = await fetch(`${serverDomain}/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const result = await res.json();
    if (result.ok) {
      toast.success("Logged out successfully");
      setUser(null);
      router.push("/");
    } else {
      toast.error(result?.message || "An error occurred");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="w-[calc(100%-48px)] sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Logout?</DialogTitle>
        </DialogHeader>
        <p>Are you sure to logout?</p>
        <DialogFooter className="flex-row-reverse">
          <DialogClose asChild>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
