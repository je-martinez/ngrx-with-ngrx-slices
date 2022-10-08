import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { PostsActions, PostsSelectors } from 'src/store/slices/posts.slice';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup = new FormGroup({
    userId: new FormControl<number>(0, [Validators.required]),
    id: new FormControl<number>(0, [Validators.required]),
    title: new FormControl<string>('', [Validators.required]),
    body: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private router: Router
  ) {
    this.actions$
      .pipe(
        takeUntil(this.unsubscribe$),
        ofType(PostsActions.deletePost.success)
      )
      .subscribe(() => {
        this.router.navigate(['/posts']);
      });
  }

  readonly post$ = this.store.select(PostsSelectors.selectSelectedPost);
  readonly loading$ = this.store.select(
    PostsSelectors.selectLoadingCreateOrUpdatePost
  );
  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.post$.pipe(takeUntil(this.unsubscribe$)).subscribe((post) => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    this.store.dispatch(PostsActions.updatePost.trigger(this.postForm.value));
  }
}
