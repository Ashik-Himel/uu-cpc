import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/components/theme/themeProvider";
import ToastContainerComp from "@/components/toast/toastContainer";
import FetchUser from "@/lib/fetchUser";
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
    "This is the club member's dashboard which can be accessed by UU CPC's member.",
};

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased h-full min-h-screen flex flex-col bg-primary/5 dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <ToastContainerComp />
          <FetchUser />
        </ThemeProvider>
      </body>
    </html>
  );
}
