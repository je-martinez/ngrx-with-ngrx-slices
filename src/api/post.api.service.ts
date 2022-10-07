import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../models/api.post.responses.models';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${environment.api_url}/posts`);
  }
}
