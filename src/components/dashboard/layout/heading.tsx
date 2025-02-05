import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { ThemeToggler } from "../../theme/themeToggler";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import LogoutToggle from "./logoutToggle";

export default function DashboardHeading({
  headingText,
}: {
  headingText: string;
}) {
  const unreadCount = 5;

  return (
    <header className="sticky top-0 z-50 bg-sidebar flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full flex justify-between items-center gap-4">
        <h4 className="text-lg font-medium w-[calc(100vw-216.87px)] sm:w-auto text-nowrap text-ellipsis overflow-hidden">
          {headingText}
        </h4>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <div
            className={cn(
              "relative inline-block cursor-pointer select-none",
              unreadCount > 0 && "mr-3 mt-1"
            )}
          >
            <Bell size={24} className="text-foreground" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                aria-label={`${unreadCount} unread notifications`}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
          <LogoutToggle triggerElement={<Button>Logout</Button>} />
        </div>
      </div>
    </header>
  );
}
