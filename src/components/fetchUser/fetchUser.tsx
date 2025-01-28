"use client";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useUserStore } from "../../lib/userStore";

export default function FetchUser() {
  const token = Cookies.get("token");
  const setUser = useUserStore((state) => state.setUser);
  const setUserLoaded = useUserStore((state) => state.setUserLoaded);

  useEffect(() => {
    try {
      if (!token) {
        return setUserLoaded(true);
      }

      const user = JSON.parse(JSON.stringify(jwt.decode(token)));
      console.log(token);
      console.log(user);
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
  }, [token, setUser, setUserLoaded]);

  return null;
}
