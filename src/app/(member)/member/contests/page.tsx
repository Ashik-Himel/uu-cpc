import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contests - Dashboard",
  description:
    "This is the club member dashboard's contests page where the club members can see the details of upcoming and earlier contests.",
};

export default function MemberContests() {
  return (
    <main>
      <DashboardHeading headingText="Contests" />
      <div className="p-4">Member Contests Page</div>
    </main>
  );
}
