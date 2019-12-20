import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../../core-module/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  error: string;

  constructor(private authService: AuthService,
              private router: Router,
              private loaderService: LoaderService) {
  }

  login(): void {
    this.loaderService.turnLoaderOn();
    this.authService.login(this.username, this.password).subscribe(() => {
        this.error = undefined;
        this.loaderService.turnLoaderOff();
        this.router.navigateByUrl(this.authService.getRedirectUrl());
      },
      errorResp => {
        this.error = errorResp.error;
        this.loaderService.turnLoaderOff();
      });
  }
}
