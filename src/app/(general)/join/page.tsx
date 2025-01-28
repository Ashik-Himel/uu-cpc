import { Metadata } from "next";
import { JoinForm } from "./joinForm";

export const metadata: Metadata = {
  title: "Join Club - UU CPC",
  description:
    "If you are not a member of the Uttara University Computer Programming Club, you can join from here.",
};

export default function JoinClub() {
  return (
    <main className="h-full md:min-height-screen flex flex-col items-center justify-start md:justify-center mx-6 md:mx-10">
      <div className="w-full max-w-sm md:max-w-3xl my-12 md:my-6">
        <JoinForm />
      </div>
    </main>
  );
}
