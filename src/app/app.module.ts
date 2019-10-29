import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './core-module/components/header/header.component';
import {FooterComponent} from './core-module/components/footer/footer.component';
import {RouterModule} from '@angular/router';
import {CoursesModule} from './courses-module/courses.module';
import {AuthModule} from './auth-module/auth.module';
import {SharedModule} from './shared-module/shared.module';

const routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoursesModule,
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
