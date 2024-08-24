import { Component, OnInit } from '@angular/core';
import { Post } from '../../Models/post';
import { PostService } from '../../Services/post.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  
  newPost: Post = new Post();

  constructor(private postService: PostService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  createPost() {
    this.postService.createPost(this.newPost).subscribe({
      next: () => {
        window.alert("Your new post has been created!");
        this.router.navigate(['post']);
      },
      error: (error: any) => {
        console.error('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['login']);
        } else {
          window.alert("An error occurred while creating the post.");
        }
      }
    });
  }
}