import { PostResponse } from '../../models/api/post.responses.models';
import { createSlice, PayloadAction } from 'ngrx-slice';
import { Post } from 'src/models/entities/posts.models';

export interface PostsState {
  posts: PostResponse[];
  postToCreateOrUpdate: Post | undefined | null;
  selectedPost: PostResponse | undefined | null;
  loadingGetPosts: boolean;
  loadingDeletePost: boolean;
  loadingCreateOrUpdatePost: boolean;
  errorGetPosts: string | any;
  errorCreateOrUpdatePost: string | any;
  errorDeletePost: string | any;
}

export const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  postToCreateOrUpdate: null,
  loadingGetPosts: false,
  loadingCreateOrUpdatePost: false,
  loadingDeletePost: false,
  errorGetPosts: null,
  errorCreateOrUpdatePost: null,
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
    selectedPost: (
      state: PostsState,
      action: PayloadAction<{ value: Post | undefined | null }>
    ) => {
      state.selectedPost = action.value ? { ...action.value } : null;
    },
    updatePost: {
      trigger: (state: PostsState, action: PayloadAction<{ post: Post }>) => {
        state.postToCreateOrUpdate = action.post;
        state.loadingCreateOrUpdatePost = true;
      },
      success: (state: PostsState, action: PayloadAction<{ post: Post }>) => {
        const indexToEdit = state.posts.findIndex(
          (item) => item.id == action.post.id
        );
        if (indexToEdit >= 0) {
          state.posts[indexToEdit] = { ...action.post };
        }
        state.selectedPost = null;
        state.loadingCreateOrUpdatePost = false;
      },
      failure: (
        state: PostsState,
        action: PayloadAction<{ error: string | any }>
      ) => {
        state.errorCreateOrUpdatePost = action.error;
        state.loadingCreateOrUpdatePost = false;
      },
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
  },
});
