import {Component, OnInit} from '@angular/core';
import {AuthService, currentUser} from '../../../auth-module/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.logout();
  }

  getCurrentUser(): string {
    return localStorage.getItem(currentUser);
  }
}
