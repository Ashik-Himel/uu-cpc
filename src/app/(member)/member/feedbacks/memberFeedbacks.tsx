"use client";

import FeedbackCard from "@/components/dashboard/feedbacks/feedbackCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Feedback } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";

export default function MemberFeedbacks() {
  const token = Cookies.get("token");
  const [page, setPage] = useState(1);
  const [recentFeedbacks, setRecentFeedbacks] = useState<Feedback[]>([]);
  const [nextPage, setNextPage] = useState(false);

  useQuery({
    queryKey: ["memberFeedbacks", page],
    queryFn: async () => {
      const res = await fetch(
        `${serverDomain}/api/feedbacks/member?skip=${
          (page - 1) * 4
        }&limit=${4}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (
        recentFeedbacks[recentFeedbacks.length - 1]?.feedbackId !==
        result?.feedbacks[result?.feedbacks.length - 1]?.feedbackId
      ) {
        setRecentFeedbacks((prevFeedbacks) => [
          ...prevFeedbacks,
          ...result?.feedbacks,
        ]);
        setNextPage(result?.nextPage);
      }
      return result?.feedbacks;
    },
  });

  const fetchNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Card>
      <CardHeader className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle>Recent Feedbacks</CardTitle>
          <CardDescription>
            View feedback to see the feedback&apos;s replies.
          </CardDescription>
        </div>
        <Button asChild>
          <Link href="/member/feedbacks/add">Give Feedback</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentFeedbacks?.map((feedback) => (
          <FeedbackCard key={feedback?._id} feedback={feedback} />
        ))}
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          variant="link"
          className={`text-lg ${nextPage ? "" : "hidden"}`}
          onClick={fetchNextPage}
        >
          Load More
        </Button>
      </CardFooter>
    </Card>
  );
}
