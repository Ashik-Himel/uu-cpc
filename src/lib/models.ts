interface Reply {
  sender: string;
  reply: string;
  createdAt: string;
}

export interface Feedback {
  _id: string;
  feedbackId: number;
  userId: string;
  type: string;
  subject: string;
  feedback: string;
  replies: Reply[];
  createdAt: string;
}
