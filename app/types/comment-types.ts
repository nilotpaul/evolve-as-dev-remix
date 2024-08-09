export type Comment = {
  _id: string;
  blogId: string;
  userImage?: string;
  userName: string;
  userId: string;
  commentText: string;
  createdAt: Date;
};
