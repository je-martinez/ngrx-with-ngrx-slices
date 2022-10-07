import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions, PostsSelectors } from 'src/store/slices/posts.slice';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store) {}

  readonly posts$ = this.store.select(PostsSelectors.selectPosts);
  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts.trigger());
    this.posts$.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
