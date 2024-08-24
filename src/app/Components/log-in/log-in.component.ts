import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  emailOrUsername: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.emailOrUsername, this.password).subscribe((response:any) => {
      window.alert('Successful Login');
      this.router.navigateByUrl('/post');
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
      this.router.navigateByUrl('/login')
    })
  }
}
