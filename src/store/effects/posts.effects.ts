import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, delay, map, of } from 'rxjs';
import { PostApiService } from '../../api/post.api.service';
import { PostsActions } from '../slices/posts.slice';
import { PostsSelectors } from 'src/store/slices/posts.slice';

@Injectable()
export class PostsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly _apiPosts: PostApiService,
    private readonly store: Store
  ) {}

  readonly getPosts = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts.trigger),
      concatMap(() =>
        this._apiPosts.getPosts().pipe(
          map((response) => PostsActions.getPosts.success({ value: response })),
          catchError((error) => of(PostsActions.getPosts.failure({ error })))
        )
      )
    )
  );

  readonly deletePost = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost.trigger),
      concatLatestFrom(() =>
        this.store.select(PostsSelectors.selectSelectedPost)
      ),
      concatMap(([{ post }, currentValue]) =>
        this._apiPosts.deletePost(currentValue?.id as number).pipe(
          map(() =>
            PostsActions.deletePost.success({ id: currentValue?.id as number })
          ),
          catchError((error) => of(PostsActions.deletePost.failure({ error })))
        )
      )
    )
  );
}
