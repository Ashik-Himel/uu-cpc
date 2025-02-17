"use client";

import darkSiteIcon from "@/assets/images/dark-icon.png";
import darkLogoText from "@/assets/images/dark-logo-text.png";
import siteIcon from "@/assets/images/icon.ico";
import logoText from "@/assets/images/logo-text.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/lib/userStore";
import {
  ArrowLeft,
  Images,
  InfoIcon,
  Laptop,
  LaptopMinimalCheck,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../../ui/sheet";
import { NavUser } from "./navUser";

const adminDashboardItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Club Details",
    url: "/admin/club-details",
    icon: InfoIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersIcon,
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Megaphone,
  },
  {
    title: "Contests",
    url: "/admin/contests",
    icon: Laptop,
  },
  {
    title: "Club Gallery",
    url: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Feedbacks",
    url: "/admin/feedbacks",
    icon: MessageSquareText,
  },
  {
    title: "Back to Home",
    url: "/",
    icon: ArrowLeft,
    superRoute: false,
  },
];

const memberDashboardItems = [
  {
    title: "Dashboard",
    url: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Announcements",
    url: "/member/announcements",
    icon: Megaphone,
  },
  {
    title: "Contests",
    url: "/member/contests",
    icon: Laptop,
  },
  {
    title: "Participated Contests",
    url: "/member/participated-contests",
    icon: LaptopMinimalCheck,
  },
  {
    title: "Feedbacks",
    url: "/member/feedbacks",
    icon: MessageSquareText,
  },
  {
    title: "Back to Home",
    url: "/",
    icon: ArrowLeft,
    superRoute: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const userLoaded = useUserStore((state) => state.userLoaded);

  return (
    <Sidebar
      className="group-data-[collapsible=icon]:w-[50px]"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div>
                <Image
                  src={siteIcon}
                  alt="Site Icon"
                  className="w-8 dark:hidden"
                />
                <Image
                  src={darkSiteIcon}
                  alt="Site Icon"
                  className="w-8 hidden dark:inline"
                />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <Image
                  src={logoText}
                  alt="UU CPC Logo"
                  className="dark:hidden w-[100px]"
                />
                <Image
                  src={darkLogoText}
                  alt="UU CPC Logo"
                  className="hidden dark:inline w-[100px]"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base mb-2">Menu</SidebarGroupLabel>
          <SidebarMenu>
            {(userLoaded
              ? user?.role === "member"
                ? memberDashboardItems
                : adminDashboardItems
              : []
            ).map((item) =>
              item?.superRoute && user?.role !== "super-admin" ? null : (
                <SidebarMenuItem key={item.title}>
                  {isMobile ? (
                    <SheetClose asChild>
                      <SidebarMenuButton tooltip={item.title} asChild>
                        <Link
                          href={item?.url}
                          className={
                            pathname === item?.url
                              ? "inline-block bg-primary text-background rounded-lg hover:!bg-primary hover:!text-background active:!bg-primary active:!text-background py-5"
                              : "py-5"
                          }
                        >
                          {item.icon && <item.icon />}
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SheetClose>
                  ) : (
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link
                        href={item?.url}
                        className={
                          pathname === item?.url
                            ? "inline-block bg-primary text-background rounded-lg hover:!bg-primary hover:!text-background active:!bg-primary active:!text-background py-5"
                            : "py-5"
                        }
                      >
                        {item.icon && <item.icon />}
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
