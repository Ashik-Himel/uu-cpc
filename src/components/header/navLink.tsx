"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  const pathname = usePathname();
  const NavLinkCSS =
    pathname === href && pathname === "/"
      ? "text-secondary border-b-2 border-secondary dark:text-primary dark:border-primary"
      : pathname === href
      ? "text-primary border-b-2 border-primary"
      : "";

  return (
    <Link href={href} className={NavLinkCSS}>
      {text}
    </Link>
  );
}
