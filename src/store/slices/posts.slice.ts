import { PostResponse } from '../../models/api/post.responses.models';
import { createSlice, noopReducer, PayloadAction } from 'ngrx-slice';
import { Post } from 'src/models/entities/posts.models';

export interface PostsState {
  posts: PostResponse[];
  selectedPost: PostResponse | undefined | null;
  loadingGetPosts: boolean;
  loadingDeletePost: boolean;
  errorGetPosts: string | any;
  errorDeletePost: string | any;
}

export const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loadingGetPosts: false,
  loadingDeletePost: false,
  errorGetPosts: null,
  errorDeletePost: null,
};

export const {
  actions: PostsActions,
  selectors: PostsSelectors,
  reducer: PostsReducer,
} = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectedPost: (
      state: PostsState,
      action: PayloadAction<{ value: Post | undefined | null }>
    ) => {
      state.selectedPost = action.value ? { ...action.value } : null;
    },
    deletePost: {
      trigger: (state: PostsState) => {
        state.loadingDeletePost = true;
      },
      success: (state: PostsState, action: PayloadAction<{ id: number }>) => {
        state.posts = state.posts.filter((p) => p.id != action.id);
        state.selectedPost = null;
        state.loadingDeletePost = false;
      },
      failure: (
        state: PostsState,
        action: PayloadAction<{ error: string | any }>
      ) => {
        state.loadingDeletePost = false;
        state.errorDeletePost = action.error;
      },
    },
    getPosts: {
      trigger: (state: PostsState) => {
        state.loadingGetPosts = true;
      },
      success: (
        state: PostsState,
        action: PayloadAction<{ value: PostResponse[] }>
      ) => {
        state.posts = [...action.value];
        state.loadingGetPosts = false;
      },
      failure: (
        state: PostsState,
        action: PayloadAction<{ error: string | any }>
      ) => {
        state.loadingGetPosts = false;
        state.errorGetPosts = action.error;
      },
    },
  },
});
