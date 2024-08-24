import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/user';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userId: string = '';
  currentUser: User = new User();
  userPosts: Post[] = []

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.currentUser = currentUser;
      this.loadUserPosts();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUserPosts(): void {
    this.postService.getPostsByUserId(this.currentUser.userId).subscribe(
      (posts: Post[]) => {
        this.userPosts = posts;
      },
      (error) => {
        console.error('Error loading user posts:', error);
      }
    );
  }

  goToUserProfile(userId: string): void {
    this.router.navigate(['/profile', userId])
  }

  isCurrentUserProfile(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser !== null && currentUser.userId === this.userId;
  }

  editPost(postId: number | undefined): void {
    if (postId !== undefined) {
      this.router.navigate(['post/edit', postId.toString()]);
    }
  }
  
  deletePost(postId: number | undefined): void {
    if (postId !== undefined) {
      this.postService.deletePost(postId.toString()).subscribe(() => {
        this.loadUserPosts();
      });
    }
  }
}