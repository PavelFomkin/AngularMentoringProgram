import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoursesComponent} from './components/courses/courses.component';
import {CreateCourseComponent} from './components/create-course/create-course.component';
import {SharedModule} from '../shared-module/shared.module';
import {CourseComponent} from './components/course/course.component';
import {ActionsComponent} from './components/actions/actions.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './components/search/search.component';
import {LoadMoreCoursesComponent} from './components/load-more-courses/load-more-courses.component';
import {BorderColorByDateDirective} from './directives/border-color-directive/border-color-by-date.directive';
import {TopRatedDirective} from './directives/top-rated-directive/top-rated.directive';
import {DurationPipe} from './pipes/duration-pipe/duration-pipe.pipe';
import {OrderByPipe} from './pipes/order-by/order-by.pipe';
import {EditCourseComponent} from './components/edit-course/edit-course.component';
import {TokenInterceptor} from '../auth-module/services/token-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {coursesReducer} from './store/reducers/courses.reducer';
import {CoursesEffects} from './store/effects/courses.effect';
import {coursesState} from './store/selectors/courses.selector';
import {AuthorComponent} from './components/author/author.component';
import {DateComponent} from './components/form/date/date.component';
import {DurationComponent} from './components/form/duration/duration.component';
import {AuthorsComponent} from './components/form/authors/authors.component';
import {TitleComponent} from './components/form/title/title.component';
import {DescriptionComponent} from './components/form/description/description.component';

const routes = [
  {path: 'courses', component: CoursesComponent},
  // {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'courses/new', component: CreateCourseComponent},
  // {path: 'courses/new', component: CreateCourseComponent, canActivate: [AuthGuard]},
  {path: 'courses/:id', component: EditCourseComponent},
  // {path: 'courses/:id', component: EditCourseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    CourseComponent,
    AuthorComponent,
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
    DateComponent,
    DurationComponent,
    AuthorsComponent,
    TitleComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(coursesState, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    FormsModule,
    ReactiveFormsModule,
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
