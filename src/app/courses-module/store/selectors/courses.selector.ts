import {CoursesState} from '../courses.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Course} from '../../models/course';

export const coursesState = 'coursesState';
export const getCoursesState = createFeatureSelector(coursesState);

export const selectCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.courses
);
export const selectCourse = (id: number) => createSelector(
  selectCourses,
  (courses: Course[]) => courses.filter(course => course.id == id).shift(),

);
export const selectCountOfCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.courses.length
);
export const selectHasMoreCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.hasMoreCourses
);
export const selectSearchData = createSelector(
  getCoursesState,
  (state: CoursesState) => state.searchData
);
export const selectEditableCourse = createSelector(
  getCoursesState,
  (state: CoursesState) => state.editableCourse
);
