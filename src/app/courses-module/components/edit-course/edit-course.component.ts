import {Component, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Course} from '../../models/course';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {CoursesState} from '../../store/courses.state';
import {Store} from '@ngrx/store';
import {selectCourse, selectEditableCourse} from '../../store/selectors/courses.selector';
import {SetEditableCourseAction, UpdateEditableCourseAction} from '../../store/actions/courses.actions';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  private ID_FIELD: string = 'id';
  course: Observable<Course> = this.store$.select(selectEditableCourse);
  id: number;

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'course ', url: '/courses/' + this.id},
  ];

  constructor(private activateRouter: ActivatedRoute,
              private store$: Store<CoursesState>) { }

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params[this.ID_FIELD];
    this.store$.select(selectCourse(this.id)).pipe(
      tap(course => this.store$.dispatch(new SetEditableCourseAction(course))),
    ).subscribe();
  }

  updateCourse(editableCourse: Course) {
    this.store$.dispatch(new UpdateEditableCourseAction(editableCourse));
  }

  goBack() {
    history.back();
  }
}
