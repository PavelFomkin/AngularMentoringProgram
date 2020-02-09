import {Component} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesState} from '../../store/courses.state';
import {Store} from '@ngrx/store';
import {SaveNewCourseAction} from '../../store/actions/courses.actions';
import {CourseValidatorService} from '../../services/course-validator.service';
import {tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  form: FormGroup;

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: '', url: '/courses'},
    {title: '', url: '/courses/new'},
  ];

  constructor(private store$: Store<CoursesState>,
              private formBuilder: FormBuilder,
              private translate: TranslateService) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(500),
      ]],
      date: ['', [
        Validators.required,
        CourseValidatorService.validateDate,
      ]],
      length: ['', [
        Validators.required,
        CourseValidatorService.validateDuration,
      ]],
      isTopRated: [''],
      authors: this.formBuilder.array([], [
        CourseValidatorService.validateAuthors,
      ]),
    });
    this.translate.stream('BREAD_CRUMB.COURSES').pipe(tap(value => this.breadcrumbLinks[0].title = value)).subscribe();
    this.translate.stream('BREAD_CRUMB.NEW_COURSE').pipe(tap(value => this.breadcrumbLinks[1].title = value)).subscribe();
  }

  createCourse() {
    this.store$.dispatch(new SaveNewCourseAction(this.form.value));
  }

  goBack() {
    history.back();
  }

  get authorForms() {
    return this.form.get('authors') as FormArray;
  }
}
