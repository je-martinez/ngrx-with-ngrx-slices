import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { PostApiService } from '../../api/post.api.service';
import { PostsActions } from '../slices/posts.slice';

@Injectable()
export class PostsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly _apiPosts: PostApiService
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
}
