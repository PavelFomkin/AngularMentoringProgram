import {Component, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {ActivatedRoute} from '@angular/router';
import {CoursesState} from '../../store/courses.state';
import {Store} from '@ngrx/store';
import {selectCourse, selectEditableCourse} from '../../store/selectors/courses.selector';
import {GetCourseAction, SetEditableCourseAction, UpdateEditableCourseAction} from '../../store/actions/courses.actions';
import {filter, take, tap} from 'rxjs/operators';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseValidatorService} from '../../services/course-validator.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  private ID_FIELD: string = 'id';
  id: number;
  form: FormGroup;
  error: string;
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: '', url: '/courses'},
    {title: '', url: '/courses/' + this.id},
  ];

  constructor(private activateRouter: ActivatedRoute,
              private store$: Store<CoursesState>,
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
  }

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params[this.ID_FIELD];
    this.store$.select(selectCourse(this.id)).pipe(
      tap(course => {
        if (!!course) {
          this.store$.dispatch(new SetEditableCourseAction(course));
        } else {
          this.store$.dispatch(new GetCourseAction(this.id));
        }
      }),
    ).subscribe();
    this.store$.select(selectEditableCourse).pipe(
      filter(course => !!course),
      take(1),
      tap(course => {
        course.authors.forEach(author => {
          this.authorForms.push(
            this.formBuilder.group({
              id: [author.id],
              name: [author.name],
              lastName: [author.lastName],
            })
          );
        });
        this.form.patchValue(course);
      }),
    ).subscribe();
    this.translate.stream('BREAD_CRUMB.COURSES').pipe(tap(value => this.breadcrumbLinks[0].title = value)).subscribe();
    this.translate.stream('BREAD_CRUMB.COURSE').pipe(tap(value => this.breadcrumbLinks[1].title = value + this.id)).subscribe();
  }

  updateCourse() {
    this.store$.dispatch(new UpdateEditableCourseAction(this.form.value));
  }

  goBack() {
    history.back();
  }

  get authorForms() {
    return this.form.get('authors') as FormArray;
  }
}
