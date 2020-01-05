import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {LoaderService} from '../../core-module/services/loader.service';
import {User} from '../models/user';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {selectToken} from '../store/selectors/auth.selector';
import {refreshUserInfo, removeUser, setRedirectUrl} from '../store/actions/auth.actions';

export const token = 'Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private redirectUrl: string;
  // private currentUser: string;
  // currentUserSubject = new Subject<string>();
  source: string = 'http://localhost:3004/';
  loginUrl: string = this.source + 'auth/login';
  userInfoUrl: string = this.source + 'auth/userinfo';

  constructor(private router: Router,
              private httpClient: HttpClient,
              private loaderService: LoaderService,
              private store: Store<AuthState>) {
    // this.store.dispatch()
    // this.currentUserSubject.pipe(
    //   distinctUntilChanged(),
    //   switchMap((userToken) => {
    //     this.loaderService.turnLoaderOn();
    //     return this.refreshUserInfo(userToken);
    //   }),
    // ).subscribe(
    //   (user: User) => {
    //     this.loaderService.turnLoaderOff();
    //     this.currentUser = user.name.first + ' ' + user.name.last;
    //     console.log(user);
    //   },
    //   () => {
    //     this.loaderService.turnLoaderOff();
    //     this.logout();
    //   });
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      distinctUntilChanged(),
      map(token => {
        console.log(token);
        return token === null;
      }));
  }


  logout(): void {
    this.store.dispatch(removeUser());
    console.log('user is removed?');
    // localStorage.removeItem(token);
    this.router.navigate(['/login']);
  }

  login(login: string, password: string): Observable<User> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post<User>(this.loginUrl, {login, password}, {headers, observe: 'response'}).pipe(
      map(resp => (resp.body as User)));
  }

  // setRedirectUrl(url: string) {
  //   this.redirectUrl = url;
  // }

  // getRedirectUrl(): string {
  //   return this.redirectUrl ? this.redirectUrl : '';
  // }

  // getCurrentUser(): string {
  //   return this.currentUser;
  // }

  public getUserInfo(userToken: string): Observable<User> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post(this.userInfoUrl, {token: userToken}, {headers, observe: 'response'}).pipe(
      map(resp => (resp.body as User)));
  }
}
