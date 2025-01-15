import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SheetClose } from "../ui/sheet";

export default function DrawerNavLink({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-4 text-lg font-medium">
          {icon}
          {text}
        </div>
        <MoveRight />
      </Link>
    </SheetClose>
  );
}
