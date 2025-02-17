"use client";

import feedbackImg from "@/assets/images/give-feedback.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function GiveFeedbackForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const token = Cookies.get("token");
  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);

    if (!feedbackType) {
      setSubmitDisabled(false);
      return toast.error("Please select the feedback type");
    }

    const form = e.currentTarget;
    const subject = (
      form.elements.namedItem("subject") as HTMLInputElement
    ).value.trim();
    const feedback = (
      form.elements.namedItem("feedback") as HTMLInputElement
    ).value.trim();

    const res = await fetch(`${serverDomain}/api/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type: feedbackType, subject, feedback }),
    });
    const result = await res.json();

    if (result.ok) {
      toast.success("Feedback submitted successfully!");
      router.back();
    } else {
      toast.error("Failed to submit your feedback");
    }
    setSubmitDisabled(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow">
        <CardContent className="grid p-0 lg:grid-cols-2">
          <div className="relative hidden bg-muted lg:block">
            <Button
              size="sm"
              className="absolute left-6 top-6 md:left-8 md:top-8 z-10"
              asChild
            >
              <Link href="/member/feedbacks">
                <ChevronLeft /> Go Back
              </Link>
            </Button>
            <Image
              src={feedbackImg}
              alt="Feedback Image"
              className="absolute inset-0 h-full w-full p-6 object-contain"
            />
          </div>
          <form
            onSubmit={handleSubmitFeedback}
            className="p-6 md:p-8 space-y-4 bg-sidebar"
          >
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Give Feedback</h1>
              <p className="text-balance text-muted-foreground">
                Fill the form to submit your feedback
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedbackType">Feedback Type</Label>
              <Select
                value={feedbackType}
                onValueChange={setFeedbackType}
                required
              >
                <SelectTrigger id="feedbackType">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Bug Report">Bug Report</SelectItem>
                  <SelectItem value="Feature Request">
                    Feature Request
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                maxLength={40}
                placeholder="Write the subject of the feedback"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                maxLength={500}
                placeholder="Please write your feedback here"
                className="h-[180px] resize-none"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitDisabled}>
              {submitDisabled ? "Submitting" : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
