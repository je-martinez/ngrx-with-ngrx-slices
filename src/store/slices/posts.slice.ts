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
      success: (state: PostsState, action: PayloadAction<PostResponse[]>) => {
        state = {
          ...state,
          posts: [...action],
          loadingGetPosts: false,
        };
      },
      failure: (state: PostsState, action: PayloadAction<string | any>) => {
        state = {
          ...state,
          loadingGetPosts: false,
          errorGetPosts: action,
        };
      },
    },
  },
});
