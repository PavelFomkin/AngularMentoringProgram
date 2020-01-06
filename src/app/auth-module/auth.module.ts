import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/reducers/auth.reducer';
import {AuthEffects} from "./store/effects/auth.effect";
import {EffectsModule} from '@ngrx/effects';

const routes = [
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      authState: authReducer,
    }),
    EffectsModule.forRoot([AuthEffects]),
    FormsModule,
  ],
  exports: [
    LoginComponent,
  ],
})
export class AuthModule {
}
