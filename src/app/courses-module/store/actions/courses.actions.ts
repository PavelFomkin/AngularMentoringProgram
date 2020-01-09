import {Action} from '@ngrx/store';
import {Course} from '../../models/course';

export enum coursesActions {
  loadCourses = '[Courses] Load courses',
  setCourses = '[Courses] Set courses',
  setHasMoreCoursesFlag = '[Courses] Set has more courses flag',
}

export class LoadCoursesAction implements Action {
  readonly type: string = coursesActions.loadCourses;
}

export class SetCoursesAction implements Action {
  readonly type: string = coursesActions.setCourses;
  constructor(public payload: Course[]) { }
}

export class SetHasMoreCoursesFlagAction implements Action {
  readonly type: string = coursesActions.setHasMoreCoursesFlag;
  constructor(public payload: boolean) { }
}
