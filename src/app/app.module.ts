import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CoursesModule} from './courses-module/courses.module';
import {AuthModule} from './auth-module/auth.module';
import {SharedModule} from './shared-module/shared.module';
import {CoreModule} from './core-module/core.module';
import {NotFoundComponent} from "./core-module/components/not-found/not-found.component";

const routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoursesModule,
    AuthModule,
    SharedModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
