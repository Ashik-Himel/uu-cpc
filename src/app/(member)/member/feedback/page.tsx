import DashboardHeading from "@/components/dashboard/heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send Feedback - Dashboard",
  description:
    "This is the club member dashboard's feedback page where the club members can send feedback and admin will receive it.",
};

export default function MemberFeedback() {
  return (
    <main>
      <DashboardHeading headingText="Send Feedback" />
      <div className="p-4">Member Feedback Page</div>
    </main>
  );
}
