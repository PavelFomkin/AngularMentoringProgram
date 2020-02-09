import {Component} from '@angular/core';
import {AuthService} from '../../../auth-module/services/auth.service';
import {AuthState} from '../../../auth-module/store/auth.state';
import {Store} from '@ngrx/store';
import {selectToken, selectUserName} from '../../../auth-module/store/selectors/auth.selector';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LogoutAction} from '../../../auth-module/store/actions/auth.actions';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  form: FormGroup;
  constructor(private authService: AuthService,
              private store: Store<AuthState>,
              private translate: TranslateService) {
    this.form = new FormGroup({
      lang: new FormControl('')
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      map(token => token !== null));
  }

  signOut() {
    this.store.dispatch(new LogoutAction());
  }

  getCurrentUser(): Observable<string> {
    return this.store.select(selectUserName);
  }
}
