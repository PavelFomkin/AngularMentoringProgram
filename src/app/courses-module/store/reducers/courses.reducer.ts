import {Action} from '@ngrx/store';
import {CoursesState} from '../courses.state';
import {
  coursesActions,
  SetCoursesAction,
  SetHasMoreCoursesFlagAction
} from '../actions/courses.actions';

const initialState: CoursesState = {
  courses: [],
  hasMoreCourses: true,
  searchData: '',
};

export function coursesReducer(state: CoursesState = initialState, action: Action) {
  switch (action.type) {
    case coursesActions.setCourses:
      return ({...state, courses: [...state.courses, (action as SetCoursesAction).payload]});
    case coursesActions.setHasMoreCoursesFlag:
      return ({...state, hasMoreCourses: (action as SetHasMoreCoursesFlagAction).payload});
    default:
      return state;
  }
}
