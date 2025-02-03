"use client";

import { serverDomain } from "@/lib/variables";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Status() {
  const token = useSearchParams().get("token");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`${serverDomain}/api/auth/verify-profile?token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setStatus(result?.message || "An error occurred");
      });
  }, [token]);

  if (!token) {
    return <p>Your link is invalid</p>;
  }

  return <p>{status}</p>;
}
