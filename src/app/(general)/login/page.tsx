import { Metadata } from "next";
import { LoginForm } from "./loginForm";

export const metadata: Metadata = {
  title: "Login - UU CPC",
  description:
    "Login to access your dashboard and manage all the club activities from your dashboard.",
};

export default function Login() {
  return (
    <main className="h-full md:min-height-screen flex flex-col items-center justify-start md:justify-center mx-6 md:mx-10">
      <div className="w-full max-w-sm md:max-w-3xl my-8 xsm:my-10 sm:my-12 md:my-6">
        <LoginForm />
      </div>
    </main>
  );
}
