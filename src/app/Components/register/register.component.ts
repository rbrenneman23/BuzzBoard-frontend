import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInIt(): void {
  }

  signUp() {
    this.userService.signUp(this.newUser).subscribe(() => {
      this.router.navigate(['login']);
    }, error => {
      window.alert("There was an error when trying to sign up.");
      console.log('Error: ', error)
    });
  }
}