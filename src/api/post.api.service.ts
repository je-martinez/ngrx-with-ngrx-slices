import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/models/entities/posts.models';
import { PostResponse } from '../models/api/post.responses.models';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${environment.api_url}/posts`);
  }

  createPost(post: Post) {
    return this.http.post<PostResponse>(`${environment.api_url}/posts`, post);
  }

  updatePost(id: number, post: Post) {
    return this.http.put<PostResponse>(
      `${environment.api_url}/posts/${id}`,
      post
    );
  }

  deletePost(id: number) {
    return this.http.delete<PostResponse>(`${environment.api_url}/posts/${id}`);
  }
}
