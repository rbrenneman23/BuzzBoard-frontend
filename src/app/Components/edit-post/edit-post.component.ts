import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { PostService } from '../../Services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  postId: string = '';

  currentPost: Post = new Post();

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get("postId") ?? "";
    this.postId = parseInt(routeId).toString();
    this.postService.getPost(this.postId).subscribe(foundPost => {
      console.log(foundPost);
      this.currentPost = foundPost;
    });
  }

  onSubmit() {
    this.postService.editPost(this.postId, this.currentPost).subscribe(editedPost => {
      window.alert('Post edited successfully');
      this.router.navigateByUrl('/post');
    }, error => {
      console.log('Error: ', error);
      window.alert('Users may not edit the posts of other users');
      this.router.navigateByUrl('/post');
    })
  }
}