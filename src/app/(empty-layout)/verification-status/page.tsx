import { Metadata } from "next";
import Status from "./status";

export const metadata: Metadata = {
  title: "Verification Status - UU CPC",
  description:
    "This page will show the verification status of your verification request.",
};

export default function VerificationStatus() {
  return (
    <main className="m-6 md:m-10">
      <div className="bg-primary/5 text-primary font-medium rounded-lg border border-primary px-4 py-8 w-full max-w-[450px] mx-auto text-center">
        <Status />
      </div>
    </main>
  );
}
