import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Dashboard",
  description:
    "This is the club admin dashboard's profile page where the admins can update their profile information.",
};

export default function AdminProfile() {
  return (
    <main>
      <DashboardHeading headingText="Profile" />
      <div className="p-4">Admin Profile Page</div>
    </main>
  );
}
