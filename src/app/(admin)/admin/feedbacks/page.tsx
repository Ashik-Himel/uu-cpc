import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks - Dashboard",
  description:
    "This is the club admin dashboard's feedbacks page where admin can see and reply the feedback of the members.",
};

export default function AdminFeedbacks() {
  return (
    <main>
      <DashboardHeading headingText="Feedbacks" />
      <div className="p-4">Admin Feedbacks Page</div>
    </main>
  );
}
