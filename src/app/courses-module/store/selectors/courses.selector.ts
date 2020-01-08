import {CoursesState} from '../courses.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const coursesState = 'coursesState';
export const getCoursesState = createFeatureSelector(coursesState);

export const selectCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.courses
);
export const selectSearchData = createSelector(
  getCoursesState,
  (state: CoursesState) => state.searchData
);
export const selectHasMoreCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.hasMoreCourses
);
