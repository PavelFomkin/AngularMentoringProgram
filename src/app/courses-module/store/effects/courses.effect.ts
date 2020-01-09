import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
  coursesActions,
  SetCoursesAction,
  SetHasMoreCoursesFlagAction
} from '../actions/courses.actions';
import {catchError, finalize, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {CoursesState} from '../courses.state';
import {Router} from '@angular/router';
import {LoaderService} from '../../../core-module/services/loader.service';
import {CourseService} from '../../services/course.service';

@Injectable()
export class CoursesEffects {
  private numberOfCoursesToLoad: number = 5;

  constructor(private actions$: Actions,
              private store: Store<CoursesState>,
              private courseService: CourseService,
              private router: Router,
              private loader: LoaderService) {
  }

  getCourses$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.loadCourses),
    tap(() => this.loader.turnLoaderOn()),
    switchMap(() =>
      this.courseService.getCourses(this.numberOfCoursesToLoad).pipe(
        map(courses => new SetCoursesAction(courses)),
        catchError(() => of(new SetHasMoreCoursesFlagAction(false))),
        finalize(() => this.loader.turnLoaderOff()),
      )
    )
  ));

  // @Effect()
  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(coursesActions.getCourses),
  //   tap(() => this.loader.turnLoaderOn()),
  //   exhaustMap((action: GetCoursesAction) =>
  //     this.authService.login(action.payload.username, action.payload.password).pipe(
  //       switchMap(resp => {
  //         return this.authService.getUserInfo(resp.body.token).pipe(
  //           map(resp => {
  //             this.router.navigateByUrl('');
  //             return new SetUserInfoAction(resp.body)
  //           }),
  //           finalize(() => this.loader.turnLoaderOff()),
  //           catchError(resp => of(new SetErrorAction(resp.error))),
  //         );
  //       }),
  //       finalize(() => this.loader.turnLoaderOff()),
  //       catchError(resp => of(new SetErrorAction(resp.error))),
  //     )
  //   )
  // ));
}
