import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthState} from "../store/auth.state";
import {Store} from "@ngrx/store";
import {selectToken} from "../store/selectors/auth.selector";
import {first, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      first(),
      switchMap(token => {
        if (token === null) {
          return next.handle(request);
        } else {
          return next.handle(
            request.clone({
              headers: request.headers.append('Authorization', token)
            })
          );
        }
      })
    );
  }
}
