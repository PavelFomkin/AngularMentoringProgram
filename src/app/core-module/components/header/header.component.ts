import {Component} from '@angular/core';
import {AuthService} from '../../../auth-module/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.logout();
  }

  getCurrentUser(): string {
    return this.authService.getUserInfo();
  }
}
