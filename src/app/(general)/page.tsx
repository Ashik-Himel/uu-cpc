import { Metadata } from "next";
import HeroSection from "./heroSection";
import WingsSection from "./wingsSection";

export const metadata: Metadata = {
  title: "UU CPC - Uttara University Computer Programming Club",
  description:
    "Uttara University Computer Programming Club (UU CPC) is a part of Uttara University. It helps students to develop their programming skills.",
};

export default function Home() {
  return (
    <main className="mb-24">
      <HeroSection />
      <WingsSection />
    </main>
  );
}
