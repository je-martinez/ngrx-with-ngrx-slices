import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PostsActions, PostsSelectors } from 'src/store/slices/posts.slice';
import { PostResponse } from '../../models/api/post.responses.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store, private readonly router: Router) {}

  readonly posts$ = this.store.select(PostsSelectors.selectPosts);
  readonly loadingGetPosts$ = this.store.select(
    PostsSelectors.selectLoadingGetPosts
  );
  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts.trigger());
    this.posts$.subscribe((data) => {
      console.log(data);
    });
  }

  onSelectPost(post: PostResponse, navigate: boolean = true) {
    this.store.dispatch(PostsActions.selectedPost({ value: post }));
    this.router.navigate(['/edit-post']);
  }

  onDeletePost(post: PostResponse) {
    this.onSelectPost(post, false);
    this.store.dispatch(PostsActions.deletePost.trigger());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
