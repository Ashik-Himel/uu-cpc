import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participated Contests - Dashboard",
  description:
    "This is the club member dashboard's participated contests page where the club members can see the list of participated contests.",
};

export default function MemberParticipatedContests() {
  return (
    <main>
      <DashboardHeading headingText="Participated Contests" />
      <div className="p-4">Member Participated Contests Page</div>
    </main>
  );
}
