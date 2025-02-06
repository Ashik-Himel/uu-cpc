import DashboardHeading from "@/components/dashboard/layout/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Metadata } from "next";
import FeedbackForm from "./feedbackForm";

export const metadata: Metadata = {
  title: "Your Feedbacks - Dashboard",
  description:
    "This is the club member dashboard's feedback page where the club members can send feedback and admin will receive it.",
};

export default function MemberFeedbacks() {
  const recentFeedbacks = [
    {
      _id: "01",
      type: "general",
      subject: "Feedback",
      feedback:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet sit magni officia, consectetur dolorem ad tempora,autem aliquid placeat sint enim labore accusamus aut ipsa, quasi asperiores iste excepturi laborum.",
      replies: [
        {
          sender: "member",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 2,
        },
        {
          sender: "admin",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 5,
        },
        {
          sender: "member",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 9,
        },
      ],
    },
    {
      _id: "02",
      type: "general",
      subject: "Feedback",
      feedback:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet sit magni officia, consectetur dolorem ad tempora,autem aliquid placeat sint enim labore accusamus aut ipsa, quasi asperiores iste excepturi laborum.",
      replies: [
        {
          sender: "member",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 2,
        },
        {
          sender: "admin",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 5,
        },
        {
          sender: "member",
          reply:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam ducimus cupiditate, recusandae perspiciatis unde eius reiciendis? Quaerat, explicabo tenetur?",
          createdAt: 9,
        },
      ],
    },
  ];

  return (
    <main>
      <DashboardHeading headingText="Your Feedbacks" />
      <div className="p-4">
        <Card className="grid grid-cols-1 xl:grid-cols-2 gap-x-6">
          <div className="row-start-2 xl:row-start-auto">
            <CardHeader>
              <CardTitle>Recent Feedbacks</CardTitle>
              <CardDescription>
                View feedback to see the feedback&apos;s replies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentFeedbacks?.map((feedback) => (
                <div
                  key={feedback?._id}
                  className="bg-primary/10 text-foreground p-4 rounded-lg cursor-pointer grid grid-cols-1 sm:grid-cols-[auto_auto] gap-3"
                >
                  <div>
                    <h4 className="text-primary text-lg font-semibold">
                      {feedback?.subject}
                    </h4>
                    <span className="inline-block text-sidebar-foreground">
                      <span>Type:</span> {feedback?.type}
                    </span>
                  </div>
                  <p className="sm:row-start-2 sm:col-span-2">
                    {feedback?.feedback.length <= 120
                      ? feedback?.feedback
                      : feedback?.feedback?.substring(0, 120) + "..."}
                  </p>
                  <div className="flex justify-end gap-2">
                    {feedback?.replies?.length ? (
                      feedback?.replies?.length === 1 ? (
                        <p className="text-nowrap font-medium">1 reply</p>
                      ) : (
                        <p className="text-nowrap font-medium">
                          {feedback?.replies?.length} replies
                        </p>
                      )
                    ) : null}
                    <MoveRight />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" className="text-lg">
                Load More...
              </Button>
            </CardFooter>
          </div>

          <div>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>
                Submit your feedback to receive it from the admin.
              </CardDescription>
            </CardHeader>
            <FeedbackForm />
          </div>
        </Card>
      </div>
    </main>
  );
}
