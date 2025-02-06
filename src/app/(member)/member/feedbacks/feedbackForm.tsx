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
import { useState } from "react";

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    console.log(email);
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
            placeholder="Please enter your feedback here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="h-[120px] resize-none"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </CardFooter>
    </form>
  );
}
