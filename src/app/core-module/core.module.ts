import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {SharedModule} from '../shared-module/shared.module';
import {CourseComponent} from './course/course.component';
import {ActionsComponent} from './actions/actions.component';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';

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
export class CoreModule {
}
