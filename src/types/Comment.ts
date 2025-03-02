// types/Comment.ts (or wherever you store your types)
export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}
