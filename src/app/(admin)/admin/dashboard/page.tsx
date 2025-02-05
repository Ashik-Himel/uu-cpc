import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - UU CPC",
  description:
    "This is the club admin's dashboard which can be accessed by UU CPC's admin.",
};

export default function AdminDashboard() {
  return (
    <main>
      <DashboardHeading headingText="Dashboard" />
      <div className="p-4">Admin Dashboard Page</div>
    </main>
  );
}
