import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Status from "./status";

export const metadata: Metadata = {
  title: "Verification Status - UU CPC",
  description:
    "This page will show the verification status of your verification request.",
};

export default function VerificationStatus() {
  return (
    <main className="m-6 md:m-10">
      <div className="bg-primary/5 text-primary font-medium rounded-lg border border-primary px-4 py-6 w-full max-w-[450px] mx-auto text-center">
        <Suspense fallback={<p>Loading status...</p>}>
          <Status />
        </Suspense>
        <Button className="mt-3" size="sm" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
