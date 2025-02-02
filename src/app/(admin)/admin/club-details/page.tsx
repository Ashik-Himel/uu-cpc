import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Details - Dashboard",
  description:
    "This is the club admin dashboard's club details page where admin can update the club information that everyone can see it.",
};

export default function AdminClubDetails() {
  return (
    <main>
      <DashboardHeading headingText="Club Details" />
      <div className="p-4">Admin Club Details Page</div>
    </main>
  );
}
