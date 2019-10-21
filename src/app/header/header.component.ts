import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from '../auth-module/services/auth.service';

export interface Link {url: string, name: string}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.logout();
  }
}
