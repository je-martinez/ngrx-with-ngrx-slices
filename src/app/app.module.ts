import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { CounterReducer } from 'src/store/slices/counter.slice';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostsReducer } from 'src/store/slices/posts.slice';
import { PostsComponent } from './posts/posts.component';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from 'src/store/effects/posts.effects';

@NgModule({
  declarations: [AppComponent, CounterComponent, HomeComponent, PostsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      counter: CounterReducer,
      posts: PostsReducer,
    }),
    EffectsModule.forRoot([PostsEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
