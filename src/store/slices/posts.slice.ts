import { PostResponse } from '../../models/api.post.responses.models';
import { createSlice, PayloadAction } from 'ngrx-slice';

export interface PostsState {
  posts: PostResponse[];
  loadingGetPosts: boolean;
  errorGetPosts: string | any;
}

export const initialState: PostsState = {
  posts: [],
  loadingGetPosts: false,
  errorGetPosts: null,
};

export const {
  actions: PostsActions,
  selectors: PostsSelectors,
  reducer: PostsReducer,
} = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
