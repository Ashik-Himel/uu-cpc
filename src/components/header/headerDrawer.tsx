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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DrawerNavLink from "./drawerNavLink";

export default function HeaderDrawer() {
  return (
    <Sheet>
      <SheetTrigger className="xl:hidden cursor-pointer select-none" asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="px-2 uppercase text-xl text-primary">
          Menu
        </SheetTitle>
        <nav className="mt-6 space-y-2">
          <DrawerNavLink text="Home" href="/" icon={<Home size={22} />} />
          <DrawerNavLink
            text="Announcements"
            href="/announcements"
            icon={<Megaphone size={22} />}
          />
          <DrawerNavLink
            text="Contests"
            href="/contests"
            icon={<Laptop size={22} />}
          />
          <DrawerNavLink
            text="Gallery"
            href="/gallery"
            icon={<Images size={22} />}
          />
          <DrawerNavLink
            text="About Club"
            href="/about"
            icon={<ReceiptText size={22} />}
          />
          <DrawerNavLink
            text="Login"
            href="/login"
            icon={<KeyRound size={22} />}
          />
          <DrawerNavLink
            text="Join Club"
            href="/join"
            icon={<UserPlus size={22} />}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
