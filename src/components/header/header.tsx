"use client";

import darkLogo from "@/assets/images/dark-logo.png";
import logo from "@/assets/images/logo.png";
import { useUserStore } from "@/lib/userStore";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "../theme/themeToggler";
import { Button } from "../ui/button";
import HeaderDrawer from "./headerDrawer";
import NavLink from "./navLink";

export default function Header() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const userLoaded = useUserStore((state) => state.userLoaded);

  return (
    <header className="py-4 sm:py-6 relative z-10">
      <div
        className={`container flex justify-between items-center text-secondary-foreground ${
          pathname === "/" ? "!text-white" : ""
        }`}
      >
        <div className="flex justify-start items-center gap-4">
          <HeaderDrawer />
          <Link
            href="/"
            className={`dark:hidden ${pathname === "/" ? "!hidden" : ""}`}
          >
            <Image
              src={logo}
              alt="UU CPC Logo"
              className="w-[140px] sm:w-[150px]"
            />
          </Link>
          <Link
            href="/"
            className={`hidden dark:inline ${
              pathname === "/" ? "!inline" : ""
            }`}
          >
            <Image
              src={darkLogo}
              alt="UU CPC Logo"
              className="w-[140px] sm:w-[150px]"
            />
          </Link>
        </div>
        <nav className="space-x-8 font-medium hidden xl:block">
          <NavLink text="Home" href="/" />
          <NavLink text="Announcements" href="/announcements" />
          <NavLink text="Contests" href="/contests" />
          <NavLink text="Gallery" href="/gallery" />
          <NavLink text="About Club" href="/about" />
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          {userLoaded ? (
            user ? (
              <Button className="hidden xsm:inline-flex" asChild>
                <Link
                  href={
                    user?.role === "member"
                      ? "/member/dashboard"
                      : "/admin/dashboard"
                  }
                >
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="hidden sm:inline-flex"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="hidden xsm:inline-flex" asChild>
                  <Link href="/join">Join Club</Link>
                </Button>
              </>
            )
          ) : (
            <Button className="px-12 hidden xsm:inline-flex">
              <Loader />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
