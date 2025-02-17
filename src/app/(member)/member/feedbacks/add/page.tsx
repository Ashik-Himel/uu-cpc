import DashboardHeading from "@/components/dashboard/layout/heading";
import { Metadata } from "next";
import GiveFeedbackForm from "./giveFeedback";

export const metadata: Metadata = {
  title: "Give Feedback - Dashboard",
  description:
    "This is the club member dashboard's give feedback page where the club members can send feedback and admin will receive it.",
};

export default function MemberGiveFeedbackPage() {
  return (
    <main>
      <DashboardHeading headingText="Give Feedback" />
      <div className="p-4">
        <GiveFeedbackForm />
      </div>
    </main>
  );
}
