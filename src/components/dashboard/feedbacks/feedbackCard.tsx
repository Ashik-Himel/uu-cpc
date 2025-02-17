import { Feedback } from "@/lib/models";
import { MoveRight } from "lucide-react";

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
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
  );
}
