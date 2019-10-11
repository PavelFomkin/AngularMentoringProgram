import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Alert, AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: Alert;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.error = this.authService.login(this.username, this.password);
  }

  redirectToRegisterPage(): void {
    this.router.navigate(['registration']);
  }
}
