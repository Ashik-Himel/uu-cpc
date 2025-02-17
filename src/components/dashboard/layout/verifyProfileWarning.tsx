"use client";

import { useUserStore } from "@/lib/userStore";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import VerifyProfileDialog from "./verifyProfileDialog";

export default function VerifyProfileWarning() {
  const token = Cookies.get("token");
  const verifyWarnDisappear = useUserStore(
    (state) => state.verifyWarnDisappear
  );
  const setVerifyWarnDisappear = useUserStore(
    (state) => state.setVerifyWarnDisappear
  );

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
          <VerifyProfileDialog
            triggerElement={
              <Button
                variant="outline"
                size="sm"
                className="text-black dark:text-white ml-2"
              >
                Verify Now
              </Button>
            }
          />
        </span>
      </div>
      <X
        className="cursor-pointer select-none"
        onClick={() => setVerifyWarnDisappear(true)}
      />
    </div>
  );
}
