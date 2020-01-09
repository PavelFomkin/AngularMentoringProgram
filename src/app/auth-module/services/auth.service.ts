import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private source: string = 'http://localhost:3004/';
  private loginUrl: string = this.source + 'auth/login';
  private userInfoUrl: string = this.source + 'auth/userinfo';

  constructor(private httpClient: HttpClient) { }

  public login(login: string, password: string): Observable<HttpResponse<any>> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.post<{ token: string }>(this.loginUrl, {login, password}, {headers, observe: 'response'});
  }

  public getUserInfo(userToken: string): Observable<HttpResponse<any>> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.post(this.userInfoUrl, {token: userToken}, {headers, observe: 'response'});
  }
}
