import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { Post } from '../../Models/post';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service'; // Import UserService
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postFeed: Post[] = [];
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(
    private postService: PostService, 
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadPosts();

    this.authSubscription = this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  onDelete(postId: number) {
    this.postService.deletePost(postId.toString()).subscribe(
      () => {
        this.loadPosts();
      }, error => {
        console.log('Error: ', error);
        window.alert('Users may not delete the posts of other users');
        this.router.navigateByUrl('/post');
      }
    );
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe(post => {
      console.log(post);
      this.postFeed = post;
    });
  }

  goToUserProfile(userId: number | undefined) {
    if (userId !== undefined) {
      this.router.navigate(['/profile', userId]);
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  getColspan(post: any): number {
    return post.content.length > 100 ? 2 : 1;
  }

  getRowspan(post: any): number {
    return post.content.length > 100 ? 2 : 1;
  }
}
