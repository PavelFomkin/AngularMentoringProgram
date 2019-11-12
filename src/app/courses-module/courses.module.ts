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
import {BorderColorByDateDirective} from './directives/border-color-by-date.directive';

const routes = [
  {path: 'courses', component: CoursesComponent},
  {path: 'create-course', component: CreateCourseComponent},
];

@NgModule({
  declarations: [
    CourseComponent,
    CoursesComponent,
    CreateCourseComponent,
    ActionsComponent,
    SearchComponent,
    LoadMoreCoursesComponent,
    BorderColorByDateDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
    CreateCourseComponent,
  ]
})
export class CoursesModule {
}
