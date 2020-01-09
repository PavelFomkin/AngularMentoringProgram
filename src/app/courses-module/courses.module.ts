import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoursesComponent} from './components/courses/courses.component';
import {CreateCourseComponent} from './components/create-course/create-course.component';
import {SharedModule} from '../shared-module/shared.module';
import {CourseComponent} from './components/course/course.component';
import {ActionsComponent} from './components/actions/actions.component';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from './components/search/search.component';
import {LoadMoreCoursesComponent} from './components/load-more-courses/load-more-courses.component';
import {BorderColorByDateDirective} from './directives/border-color-directive/border-color-by-date.directive';
import {TopRatedDirective} from './directives/top-rated-directive/top-rated.directive';
import {DurationPipe} from './pipes/duration-pipe/duration-pipe.pipe';
import {OrderByPipe} from './pipes/order-by/order-by.pipe';
import {EditCourseComponent} from './components/edit-course/edit-course.component';
import {AuthGuard} from '../auth-module/services/auth.guard';
import {TokenInterceptor} from '../auth-module/services/token-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {coursesReducer} from './store/reducers/courses.reducer';
import {CoursesEffects} from './store/effects/courses.effect';
import {coursesState} from './store/selectors/courses.selector';

const routes = [
  {path: 'courses', component: CoursesComponent},
  // {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'courses/new', component: CreateCourseComponent, canActivate: [AuthGuard]},
  {path: 'courses/:id', component: EditCourseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    CourseComponent,
    CoursesComponent,
    CreateCourseComponent,
    EditCourseComponent,
    ActionsComponent,
    SearchComponent,
    LoadMoreCoursesComponent,
    BorderColorByDateDirective,
    TopRatedDirective,
    DurationPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(coursesState, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    FormsModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
    CreateCourseComponent,
    EditCourseComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
})
export class CoursesModule {
}
