import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Gallery - Dashboard",
  description:
    "This is the club admin dashboard's club gallery page where admin can add or remove the club related photos.",
};

export default function AdminClubGallery() {
  return (
    <main>
      <DashboardHeading headingText="Club Gallery" />
      <div className="p-4">Admin Club Gallery Page</div>
    </main>
  );
}
