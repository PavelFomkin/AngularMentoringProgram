import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export const token = 'Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl: string;
  private currentUser: string = 'anonymous';
  source: string = 'http://localhost:3004/';
  loginUrl: string = this.source + 'auth/login';
  userInfoUrl: string = this.source + 'auth/userinfo';

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(token) !== null;
  }

  logout(): void {
    localStorage.removeItem(token);
    this.router.navigate(['/login']);

    this.currentUser = 'anonymous';
  }

  login(login: string, password: string): Observable<HttpResponse<object>> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post(this.loginUrl, {login, password}, {headers, observe: 'response'})
      .pipe(tap(resp => {
        const userToken = (resp.body as {token: string}).token;
        localStorage.setItem(token, userToken);
        this.getUserInfo(userToken).subscribe(userName => this.currentUser = userName);
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

  private getUserInfo(userToken: string) {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.httpClient.post(this.userInfoUrl, {token: userToken}, {headers, observe: 'response'})
      .pipe(map(resp => (resp.body as {login: string}).login ));
  }
}
