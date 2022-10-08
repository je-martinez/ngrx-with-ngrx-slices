import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'counter',
    component: CounterComponent,
    data: {
      title: 'Counter Page',
    },
  },
  {
    path: 'posts',
    component: PostsComponent,
    data: {
      title: 'Posts Page',
    },
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
    data: {
      title: 'Edit Post Page',
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
