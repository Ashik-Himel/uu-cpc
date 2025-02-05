import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements - Dashboard",
  description:
    "This is the club admin dashboard's announcements page where admin can add, remove or update the announcements.",
};

export default function AdminAnnouncements() {
  return (
    <main>
      <DashboardHeading headingText="Announcements" />
      <div className="p-4">Admin Announcements Page</div>
    </main>
  );
}
