
export interface CommentProps {
  commentId: string;
  userId: string;
  userName: string;
  userAvatarUri?: string;
  comment: string;
  createdAt: string;
  likes: number;
  isLikedByCurrentUser?: boolean;
}