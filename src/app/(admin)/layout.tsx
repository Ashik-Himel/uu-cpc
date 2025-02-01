import { AppSidebar } from "@/components/dashboard/sidebar";
import FetchUserState from "@/components/fetchUser/fetchUserState";
import { ThemeProvider } from "@/components/theme/themeProvider";
import ToastContainerComp from "@/components/toast/toastContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - UU CPC",
  description:
    "This is the club admin's dashboard which can be accessed by UU CPC's admin.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-primary/5 dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <ToastContainerComp />
          <FetchUserState />
        </ThemeProvider>
      </body>
    </html>
  );
}
