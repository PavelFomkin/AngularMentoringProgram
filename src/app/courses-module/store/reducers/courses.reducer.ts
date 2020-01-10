import {Action} from '@ngrx/store';
import {CoursesState} from '../courses.state';
import {
  AddCoursesAction,
  coursesActions,
  RemoveCourseAction,
  SetCoursesAction,
  SetEditableCourseAction,
  SetHasMoreCoursesFlagAction,
  SetSearchDataAction
} from '../actions/courses.actions';

const initialState: CoursesState = {
  courses: [],
  editableCourse: null,
  hasMoreCourses: true,
  searchData: '',
};

export function coursesReducer(state: CoursesState = initialState, action: Action) {
  switch (action.type) {
    case coursesActions.setCourses:
      return ({...state, courses: (action as SetCoursesAction).payload});
    case coursesActions.addCourses:
      return ({...state, courses: state.courses.concat((action as AddCoursesAction).payload)});
    case coursesActions.removeCourse:
      return ({...state, courses: state.courses.filter(course => course.id !== (action as RemoveCourseAction).payload)});
    case coursesActions.setEditableCourse:
      return ({...state, editableCourse: (action as SetEditableCourseAction).payload});
    case coursesActions.resetEditableCourse:
      return ({...state, editableCourse: initialState.editableCourse});
    case coursesActions.setHasMoreCoursesFlag:
      return ({...state, hasMoreCourses: (action as SetHasMoreCoursesFlagAction).payload});
    case coursesActions.setSearchData:
      return ({...state, searchData: (action as SetSearchDataAction).payload});
    case coursesActions.resetSearchData:
      return ({...state, searchData: initialState.searchData});
    default:
      return state;
  }
}
