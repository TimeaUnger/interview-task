import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: number;
  name: string;
  body: string;
}

interface CommentsState {
  commentsByPage: Record<number, Comment[]>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: CommentsState = {
  commentsByPage: {},
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<{ page: number; comments: Comment[] }>) => {
      state.commentsByPage[action.payload.page] = action.payload.comments;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setComments, setLoading, setError, setPage, setTotalPages } = commentsSlice.actions;
export default commentsSlice.reducer;
