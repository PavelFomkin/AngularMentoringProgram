import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../../core-module/services/loader.service';
import {AuthState} from '../../store/auth.state';
import {Store} from '@ngrx/store';
import {login} from '../../store/actions/auth.actions';
import {selectRedirectUrl} from '../../store/selectors/auth.selector';
import {map} from 'rxjs/operators';

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
              private loaderService: LoaderService,
              private store: Store<AuthState>) {
  }

  login(): void {
    this.loaderService.turnLoaderOn();
    this.authService.login(this.username, this.password).subscribe(() => {
        this.store.dispatch(login);
        this.store.select(selectRedirectUrl).pipe(
          map(url => this.router.navigateByUrl(url))
        );
      });
    this.loaderService.turnLoaderOff();
  }
}
