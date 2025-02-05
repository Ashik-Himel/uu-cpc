import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contests - Dashboard",
  description:
    "This is the club admin dashboard's contests page where admin can add, remove or update the contests information.",
};

export default function AdminContests() {
  return (
    <main>
      <DashboardHeading headingText="Contests" />
      <div className="p-4">Admin Contests Page</div>
    </main>
  );
}
