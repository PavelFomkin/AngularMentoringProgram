import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {LoaderService} from '../../core-module/services/loader.service';
import {User} from '../models/user';

export const token = 'Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl: string;
  private currentUser: string;
  currentUserSubject = new Subject<string>();
  source: string = 'http://localhost:3004/';
  loginUrl: string = this.source + 'auth/login';
  userInfoUrl: string = this.source + 'auth/userinfo';

  constructor(private router: Router,
              private httpClient: HttpClient,
              private loaderService: LoaderService) {
    this.currentUserSubject.pipe(
      distinctUntilChanged(),
      switchMap((userToken) => {
        this.loaderService.turnLoaderOn();
        return this.getUserInfo(userToken);
      }),
    ).subscribe(
      (user: User) => {
        this.loaderService.turnLoaderOff();
        this.currentUser = user.name.first + ' ' + user.name.last;
        console.log(user);
      },
      () => {
        this.loaderService.turnLoaderOff();
        this.logout();
      });
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(token) !== null) {
      this.currentUserSubject.next(localStorage.getItem(token));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(token);
    this.router.navigate(['/login']);
  }

  login(login: string, password: string): Observable<HttpResponse<object>> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post<User>(this.loginUrl, {login, password}, {headers, observe: 'response'})
      .pipe(tap(resp => {
        const userToken = (resp.body as User).token;
        localStorage.setItem(token, userToken);
        this.currentUserSubject.next(userToken);
      }));
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl ? this.redirectUrl : '';
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  private getUserInfo(userToken: string): Observable<User> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post(this.userInfoUrl, {token: userToken}, {headers, observe: 'response'})
      .pipe(map(resp => (resp.body as User)));
  }
}
