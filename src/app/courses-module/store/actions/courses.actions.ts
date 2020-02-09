import {Action} from '@ngrx/store';
import {Course} from '../../models/course';

export enum coursesActions {
  getCourses = '[Courses] Get courses', // effect
  getCoursesBySearchData = '[Courses] Get courses by search data', // effect
  getMoreCourses = '[Courses] Get more courses', // effect
  setCourses = '[Courses] Set courses',
  addCourses = '[Courses] Add courses',

  getCourse = '[Courses] Get course', // effect
  setEditableCourse = '[Courses] Set editable course',
  resetEditableCourse = '[Courses] Reset editable course',
  updateEditableCourse = '[Courses] Update editable course', // effect
  saveNewCourse = '[Courses] Save new course', // effect
  removeCourseFromBE = '[Courses] Remove course from BE', // effect
  removeCourse = '[Courses] Remove course',

  setHasMoreCoursesFlag = '[Courses] Set has more courses flag',
  setSearchData = '[Courses] Set search data',
  resetSearchData = '[Courses] Reset search data',
}

export class GetCoursesAction implements Action {
  readonly type: string = coursesActions.getCourses;
}

export class GetCoursesBySearchDataAction implements Action {
  readonly type: string = coursesActions.getCoursesBySearchData;
  constructor(public payload: string) { }
}

export class GetMoreCoursesAction implements Action {
  readonly type: string = coursesActions.getMoreCourses;
}

export class SetCoursesAction implements Action {
  readonly type: string = coursesActions.setCourses;
  constructor(public payload: Course[]) { }
}

export class AddCoursesAction implements Action {
  readonly type: string = coursesActions.addCourses;
  constructor(public payload: Course[]) { }
}

export class GetCourseAction implements Action {
  readonly type: string = coursesActions.getCourse;
  constructor(public payload: number) { }
}

export class ResetEditableCourseAction implements Action {
  readonly type: string = coursesActions.resetEditableCourse;
}

export class SetEditableCourseAction implements Action {
  readonly type: string = coursesActions.setEditableCourse;
  constructor(public payload: Course) { }
}

export class UpdateEditableCourseAction implements Action {
  readonly type: string = coursesActions.updateEditableCourse;
  constructor(public payload: Course) { }
}

export class SaveNewCourseAction implements Action {
  readonly type: string = coursesActions.saveNewCourse;
  constructor(public payload: Course) { }
}

export class RemoveCourseFromBEAction implements Action {
  readonly type: string = coursesActions.removeCourseFromBE;
  constructor(public payload: number) { }
}

export class RemoveCourseAction implements Action {
  readonly type: string = coursesActions.removeCourse;
  constructor(public payload: number) { }
}

export class SetHasMoreCoursesFlagAction implements Action {
  readonly type: string = coursesActions.setHasMoreCoursesFlag;
  constructor(public payload: boolean) { }
}

export class SetSearchDataAction implements Action {
  readonly type: string = coursesActions.setSearchData;
  constructor(public payload: string) { }
}

export class ResetSearchDataAction implements Action {
  readonly type: string = coursesActions.resetSearchData;
}
