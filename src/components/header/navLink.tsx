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

  return (
    <Link
      href={href}
      className={
        pathname === href ? "text-primary border-b-2 border-primary" : ""
      }
    >
      {text}
    </Link>
  );
}
