import {Action} from '@ngrx/store';
import {Course} from '../../models/course';

export enum coursesActions {
  loadCourses = '[Courses] Load courses',
  loadMoreCourses = '[Courses] Load more courses',
  setCourses = '[Courses] Set courses',
  addCourses = '[Courses] Add courses',
  setHasMoreCoursesFlag = '[Courses] Set has more courses flag',
  setSearchData = '[Courses] Set search data',
}

export class LoadCoursesAction implements Action {
  readonly type: string = coursesActions.loadCourses;
}

export class LoadMoreCoursesAction implements Action {
  readonly type: string = coursesActions.loadMoreCourses;
}

export class SetCoursesAction implements Action {
  readonly type: string = coursesActions.setCourses;
  constructor(public payload: Course[]) { }
}

export class AddCoursesAction implements Action {
  readonly type: string = coursesActions.addCourses;
  constructor(public payload: Course[]) { }
}

export class SetHasMoreCoursesFlagAction implements Action {
  readonly type: string = coursesActions.setHasMoreCoursesFlag;
  constructor(public payload: boolean) { }
}

export class SetSearchDataAction implements Action {
  readonly type: string = coursesActions.setSearchData;
  constructor(public payload: string) { }
}
