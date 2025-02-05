import DashboardHeading from "@/components/dashboard/layout/heading";
import Profile from "@/components/dashboard/profile/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Dashboard",
  description:
    "This is the club member dashboard's profile page where the club members can update their profile information.",
};

export default function MemberProfile() {
  return (
    <main>
      <DashboardHeading headingText="Profile" />
      <div className="p-6">
        <Profile />
      </div>
    </main>
  );
}
