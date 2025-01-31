import Link from "next/link";
import { ThemeToggler } from "../theme/themeToggler";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import LogoutToggle from "./logoutToggle";

export default function DashboardHeading({
  headingText,
}: {
  headingText: string;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full flex justify-between items-center gap-4">
        <h4 className="text-lg font-medium">{headingText}</h4>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <Button variant="outline" className="hidden sm:inline-flex" asChild>
            <Link href="/">Home</Link>
          </Button>
          <LogoutToggle triggerElement={<Button>Logout</Button>} />
        </div>
      </div>
    </header>
  );
}
