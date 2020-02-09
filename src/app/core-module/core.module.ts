import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AuthModule} from '../auth-module/auth.module';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoaderComponent} from './components/loader/loader.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
  ]
})
export class CoreModule {
}
