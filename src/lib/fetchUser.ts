"use client";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useUserStore } from "./userStore";

export default function FetchUser() {
  const token = Cookies.get("token");
  const setUser = useUserStore((state) => state.setUser);
  const setUserLoaded = useUserStore((state) => state.setUserLoaded);

  try {
    if (!token) {
      return setUserLoaded(true);
    }

    const user = jwt.decode(token);
    if (!user) {
      return setUserLoaded(true);
    }
    setUser(user);
  } catch (error) {
    setUserLoaded(true);
    if (error instanceof jwt.JsonWebTokenError) {
      return console.error(error);
    }
    console.error(error);
  }
}
