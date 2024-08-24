import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent implements OnInit {
  currentUserId: string | null = null;
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser) {
          this.currentUserId = currentUser.userId;
        }
      } else {
        this.currentUserId = null;
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
    window.alert('Successfully logged out');
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}