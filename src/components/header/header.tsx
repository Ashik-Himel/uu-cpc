import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeaderDrawer from "./headerDrawer";
import NavLink from "./navLink";

export default function Header() {
  return (
    <header className="py-4">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="UU CPC Logo" className="w-[100px]" />
        </Link>
        <nav className="space-x-8 font-medium hidden xl:block">
          <NavLink text="Home" href="/" />
          <NavLink text="Announcements" href="/announcements" />
          <NavLink text="Contests" href="/contests" />
          <NavLink text="Gallery" href="/gallery" />
          <NavLink text="About Club" href="/about" />
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/join">Join Club</Link>
          </Button>
          <HeaderDrawer />
        </div>
      </div>
    </header>
  );
}
