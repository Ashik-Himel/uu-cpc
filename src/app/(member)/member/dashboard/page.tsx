import LogoutToggle from "@/components/dashboard/logoutToggle";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - UU CPC",
  description:
    "This is the club member's dashboard which can be accessed by UU CPC's members.",
};

export default function MemberDashboard() {
  return (
    <main>
      <div className="container my-12">
        <LogoutToggle triggerElement={<Button>Logout</Button>} />
      </div>
    </main>
  );
}
