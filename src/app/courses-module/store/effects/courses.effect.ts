import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  AddCoursesAction,
  coursesActions,
  GetCourseAction,
  GetCoursesBySearchDataAction,
  RemoveCourseAction,
  ResetEditableCourseAction,
  SaveNewCourseAction,
  SetCoursesAction,
  SetEditableCourseAction,
  SetHasMoreCoursesFlagAction,
  UpdateEditableCourseAction
} from '../actions/courses.actions';
import {catchError, finalize, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Store} from '@ngrx/store';
import {CoursesState} from '../courses.state';
import {Router} from '@angular/router';
import {LoaderService} from '../../../core-module/services/loader.service';
import {CourseService} from '../../services/course.service';
import {selectCountOfCourses, selectSearchData} from '../selectors/courses.selector';

@Injectable()
export class CoursesEffects {
  constructor(private actions$: Actions,
              private store$: Store<CoursesState>,
              private courseService: CourseService,
              private router: Router,
              private loader: LoaderService) {
  }

  getCourses$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.getCourses),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap(() => {
      return this.courseService.getCourses().pipe(
        mergeMap(courses => [
          new SetCoursesAction(courses),
          new SetHasMoreCoursesFlagAction(this.courseService.numberOfCoursesToLoad <= courses.length)
        ]),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff()),
      );
    })
  ));

  getCoursesBySearchData$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.getCoursesBySearchData),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap((action) =>
      this.courseService.getCourses((action as GetCoursesBySearchDataAction).payload).pipe(
        mergeMap(courses => [
          new SetCoursesAction(courses),
          new SetHasMoreCoursesFlagAction(this.courseService.numberOfCoursesToLoad <= courses.length)
        ]),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff()),
      )
    )
  ));

  loadMoreCourses$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.getMoreCourses),
    tap(() => this.loader.turnLoaderOn()),
    withLatestFrom(this.store$.select(selectCountOfCourses), this.store$.select(selectSearchData)),
    mergeMap(data =>
      this.courseService.loadMore(data[1], data[2]).pipe(
      mergeMap(courses => [
        new AddCoursesAction(courses),
        new SetHasMoreCoursesFlagAction(this.courseService.numberOfCoursesToLoad <= courses.length)
      ]),
      catchError(() => EMPTY),
      finalize(() => this.loader.turnLoaderOff())
    )),
  ));

  removeCourse$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.removeCourseFromBE),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap(action =>
      this.courseService.removeCourse((action as RemoveCourseAction).payload).pipe(
        map(() => new RemoveCourseAction((action as RemoveCourseAction).payload)),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff())
      )
    )
  ));

  getCourse$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.getCourse),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap(action =>
      this.courseService.getCourse((action as GetCourseAction).payload).pipe(
        map(course => new SetEditableCourseAction(course)),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff())
      )
    )
  ));

  updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.updateEditableCourse),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap(action =>
      this.courseService.updateCourse((action as UpdateEditableCourseAction).payload).pipe(
        map(() => {
          this.router.navigateByUrl('/courses');
          return new ResetEditableCourseAction();
        }),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff())
      )
    )
  ));

  saveNewCourse$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.saveNewCourse),
    tap(() => this.loader.turnLoaderOn()),
    mergeMap(action =>
      this.courseService.createCourse((action as SaveNewCourseAction).payload).pipe(
        map(() => {
          this.router.navigateByUrl('/courses');
          return new ResetEditableCourseAction();
        }),
        catchError(() => EMPTY),
        finalize(() => this.loader.turnLoaderOff())
      )
    )
  ));
}
