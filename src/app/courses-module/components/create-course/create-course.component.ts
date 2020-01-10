import {Component} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {NgForm} from '@angular/forms';
import {CoursesState} from '../../store/courses.state';
import {Store} from '@ngrx/store';
import {SaveNewCourseAction} from '../../store/actions/courses.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {

  constructor(private store$: Store<CoursesState>) { }

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'New Course', url: '/courses/new'},
  ];

  createCourse(newCourse: NgForm) {
    this.store$.dispatch(new SaveNewCourseAction(newCourse.form.value));
  }

  goBack() {
    history.back();
  }
}
