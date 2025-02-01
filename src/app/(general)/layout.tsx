import FetchUserState from "@/components/fetchUser/fetchUserState";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/components/theme/themeProvider";
import ToastContainerComp from "@/components/toast/toastContainer";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UU CPC - Uttara University Computer Programming Club",
  description:
    "Uttara University Computer Programming Club (UU CPC) is a part of Uttara University. It helps students to develop their programming skills.",
};

export default function RootLayout({
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
          <FetchUserState />
        </ThemeProvider>
      </body>
    </html>
  );
}
