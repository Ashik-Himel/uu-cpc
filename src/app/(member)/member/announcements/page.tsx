import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements - Dashboard",
  description:
    "This is the club member dashboard's announcements page where the club members see all the club announcements.",
};

export default function MemberAnnouncements() {
  return (
    <main>
      <DashboardHeading headingText="Announcements" />
      <div className="p-4">Member Announcements Page</div>
    </main>
  );
}
