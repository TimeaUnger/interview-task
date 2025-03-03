export interface Comment {
  id: number;
  name: string;
  email?: string;
  body: string;
}

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}
export interface RootState {
  comments: CommentsState;
}
