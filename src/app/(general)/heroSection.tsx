import SpaceAnimation from "@/components/backgrounds/spaceAnimation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative -top-[66.56px] xsm:-top-[72px] sm:-top-[88px] w-full h-screen overflow-hidden">
      <SpaceAnimation />
      <div className="container text-white absolute inset-0 md:top-[88px] grid grid-cols-1 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold !leading-[1.3] mb-4">
            Grow Your Coding Skills!
          </h1>
          <p className="lg:text-lg leading-[1.6] mb-10">
            Grow your coding skills by learning and practicing with Uttara
            University Computer Programming Club (UU CPC). Get all
            announcements, contests&apos; updates and participate in the
            contests to level up your coding skills and achieve certificate.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/contests">Contests</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/announcements">Announcements</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
