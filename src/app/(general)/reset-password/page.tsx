import { Metadata } from "next";
import ResetPasswordForm from "./resetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - UU CPC",
  description:
    "If you forgot your password and you requested to reset your password, you can set a new password from this page.",
};

export default function ResetPassword() {
  return (
    <main className="h-full md:min-height-screen flex flex-col items-center justify-start md:justify-center mx-6 md:mx-10">
      <div className="w-full max-w-sm md:max-w-3xl my-8 xsm:my-10 sm:my-12 md:my-6">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
