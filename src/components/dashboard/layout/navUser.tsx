"use client";

import fallbackAvatar from "@/assets/images/fallback-avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "../../ui/sheet";
import LogoutToggle from "./logoutToggle";

export function NavUser() {
  const { isMobile } = useSidebar();
  const token = Cookies.get("token");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${serverDomain}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result?.user;
    },
  });

  if (isLoading) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-full">
                  <Image
                    src={fallbackAvatar}
                    alt={user?.name || "User Avatar"}
                  />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-full">
                    <Image
                      src={fallbackAvatar}
                      alt={user?.name || "User Avatar"}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                href={
                  user?.role === "member" ? "/member/profile" : "/admin/profile"
                }
              >
                {isMobile ? (
                  <SheetClose asChild>
                    <DropdownMenuItem className="cursor-pointer select-none">
                      <Settings />
                      Profile
                    </DropdownMenuItem>
                  </SheetClose>
                ) : (
                  <DropdownMenuItem className="cursor-pointer select-none">
                    <Settings />
                    Profile
                  </DropdownMenuItem>
                )}
              </Link>
              <DropdownMenuSeparator />
              <LogoutToggle
                triggerElement={
                  <div className="relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none">
                    <LogOut />
                    Log out
                  </div>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
