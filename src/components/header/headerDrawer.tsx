import darkLogo from "@/assets/images/dark-logo.png";
import logo from "@/assets/images/logo.png";
import { useUserStore } from "@/lib/userStore";
import {
  Home,
  Images,
  KeyRound,
  Laptop,
  Megaphone,
  Menu,
  ReceiptText,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DrawerNavLink from "./drawerNavLink";

export default function HeaderDrawer() {
  const user = useUserStore((state) => state.user);
  const userLoaded = useUserStore((state) => state.userLoaded);

  return (
    <Sheet>
      <SheetTrigger className="xl:hidden cursor-pointer select-none" asChild>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[18rem] p-2">
        <Image
          src={logo}
          alt="UU CPC Logo"
          className="dark:hidden w-[150px] p-2 mb-5"
        />
        <Image
          src={darkLogo}
          alt="UU CPC Logo"
          className="hidden dark:inline w-[150px] p-2 mb-5"
        />
        <SheetTitle className="text-sidebar-foreground/70 text-base font-medium mb-3 px-2">
          Menu
        </SheetTitle>
        <nav className="space-y-1.5">
          <DrawerNavLink text="Home" href="/" icon={<Home size={16} />} />
          <DrawerNavLink
            text="Announcements"
            href="/announcements"
            icon={<Megaphone size={16} />}
          />
          <DrawerNavLink
            text="Contests"
            href="/contests"
            icon={<Laptop size={16} />}
          />
          <DrawerNavLink
            text="Gallery"
            href="/gallery"
            icon={<Images size={16} />}
          />
          <DrawerNavLink
            text="About Club"
            href="/about"
            icon={<ReceiptText size={16} />}
          />
          {userLoaded ? (
            user ? (
              <DrawerNavLink
                text="Dashboard"
                href={
                  user?.role === "member"
                    ? "/member/dashboard"
                    : "/admin/dashboard"
                }
                icon={<KeyRound size={16} />}
              />
            ) : (
              <>
                <DrawerNavLink
                  text="Login"
                  href="/login"
                  icon={<KeyRound size={16} />}
                />
                <DrawerNavLink
                  text="Join Club"
                  href="/join"
                  icon={<UserPlus size={16} />}
                />
              </>
            )
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
