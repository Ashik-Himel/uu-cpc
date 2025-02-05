import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users - Dashboard",
  description:
    "This is the club admin dashboard's users page where admin can see the list of users and super admin can manage the users.",
};

export default function AdminUsers() {
  return (
    <main>
      <DashboardHeading headingText="Users" />
      <div className="p-4">Admin Users Page</div>
    </main>
  );
}
