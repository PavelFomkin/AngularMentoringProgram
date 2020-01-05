import {Component} from '@angular/core';
import {AuthService} from '../../../auth-module/services/auth.service';
import {AuthState} from '../../../auth-module/store/auth.state';
import {Store} from '@ngrx/store';
import {selectUserName} from '../../../auth-module/store/selectors/auth.selector';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              private store: Store<AuthState>) {
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.logout();
  }

  getCurrentUser(): Observable<string> {
    return this.store.select(selectUserName);
    // return this.authService.getCurrentUser();
  }
}
