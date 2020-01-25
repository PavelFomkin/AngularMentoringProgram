import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../../core-module/services/loader.service';
import {AuthState} from '../../store/auth.state';
import {Store} from '@ngrx/store';
import {selectError} from '../../store/selectors/auth.selector';
import {LoginAction} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  error$: Observable<string> = this.store$.select(selectError);

  constructor(private authService: AuthService,
              private router: Router,
              private loaderService: LoaderService,
              private store$: Store<AuthState>) {
   this.form = new FormGroup({
     username: new FormControl('', [Validators.required]),
     password: new FormControl('', [Validators.required]),
     }
   );
  }

  login(): void {
    this.store$.dispatch(new LoginAction({username: this.form.get('username').value, password: this.form.get('password').value}));
  }
}
