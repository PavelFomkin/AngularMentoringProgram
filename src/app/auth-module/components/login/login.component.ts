import {Component, OnInit} from '@angular/core';
import {AuthService, token} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(resp => {
        localStorage.setItem(token, (resp.body as { token: string }).token);
        this.error = undefined;

        this.router.navigateByUrl(this.authService.getRedirectUrl());
      },
      errorResp => {
        this.error = errorResp.error;
      });
  }
}
