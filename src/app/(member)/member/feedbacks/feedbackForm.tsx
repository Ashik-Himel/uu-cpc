"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { serverDomain } from "@/lib/variables";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FeedbackForm() {
  const token = Cookies.get("token");
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
      form.reset();
    } else {
      toast.error("Failed to submit your feedback");
    }
    setSubmitDisabled(false);
  };

  return (
    <form onSubmit={handleSubmitFeedback}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedbackType">Feedback Type</Label>
          <Select value={feedbackType} onValueChange={setFeedbackType} required>
            <SelectTrigger id="feedbackType">
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            maxLength={40}
            placeholder="Enter the subject of the feedback"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea
            id="feedback"
            maxLength={500}
            placeholder="Please enter your feedback here"
            className="h-[120px] resize-none"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={submitDisabled}>
          {submitDisabled ? "Submitting" : "Submit Feedback"}
        </Button>
      </CardFooter>
    </form>
  );
}
