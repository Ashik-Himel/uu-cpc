import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - UU CPC",
  description:
    "This is the club member's dashboard which can be accessed by UU CPC's members.",
};

export default function MemberDashboard() {
  return (
    <main>
      <DashboardHeading headingText="Dashboard" />
      <div className="p-4">Member Dashboard Page</div>
    </main>
  );
}
