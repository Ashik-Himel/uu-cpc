"use client";

import { serverDomain } from "@/lib/variables";
import { useUserStore } from "../../lib/userStore";

export default function FetchUser() {
  const setUser = useUserStore((state) => state.setUser);
  const setUserLoaded = useUserStore((state) => state.setUserLoaded);

  fetch(`${serverDomain}/api/auth/fetch-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok) {
        setUser(result.user);
      } else setUserLoaded(true);
    })
    .catch(() => {
      setUserLoaded(true);
    });

  return null;
}
