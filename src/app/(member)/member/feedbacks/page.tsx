import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";
import MemberFeedbacks from "./memberFeedbacks";

export const metadata: Metadata = {
  title: "Feedbacks - Dashboard",
  description:
    "This is the club member dashboard's feedback page where the club members can see all feedbacks added by him/her.",
};

export default function MemberFeedbacksPage() {
  return (
    <main>
      <DashboardHeading headingText="Feedbacks" />
      <div className="p-4">
        <MemberFeedbacks />
      </div>
    </main>
  );
}
