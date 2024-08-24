import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../Models/post";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    baseURL: string = "http://localhost:5016/api/post";
    tokenKey: string = "myPostToken";

    constructor(private http: HttpClient, private router: Router) { }

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.baseURL);
    }

    getPostsByUserId(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseURL}/user/${userId}`);
    }

    getPost(postId: string): Observable<Post> {
        return this.http.get<Post>(`${this.baseURL}/${postId}`);
    }

    createPost(newPost: Post): Observable<any> {
        const headers = this.getHeaders();
        return this.http.post(this.baseURL, newPost, { headers });
    }

    editPost(postId: string, editedPost: Post): Observable<any> {
        const headers = this.getHeaders();
        return this.http.put(`${this.baseURL}/${editedPost.postId}`, editedPost, { headers });
    }

    deletePost(postId: string): Observable<any> {
        const headers = this.getHeaders();
        return this.http.delete(`${this.baseURL}/${postId}`, { headers });
    }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
          return new HttpHeaders().set('Authorization', `Bearer ${token}`);
        } else {
          this.router.navigate(['login']);
          return new HttpHeaders(); 
        }
      }
}