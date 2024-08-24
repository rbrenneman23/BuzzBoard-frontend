import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { PostsComponent } from './Components/posts/posts.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { EditPostComponent } from './Components/edit-post/edit-post.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/post",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LogInComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "post",
    component: PostsComponent
  },
  {
    path: "post/new",
    component: CreatePostComponent, canActivate: [AuthGuard]
  },
  {
    path: "post/edit/:postId",
    component: EditPostComponent, canActivate: [AuthGuard]
  },
  {
    path: "profile/:userId",
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
