import {CoursesState} from '../courses.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {concatAll, concatMap} from "rxjs/operators";

export const coursesState = 'coursesState';
export const getCoursesState = createFeatureSelector(coursesState);

export const selectCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.courses
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
// export const selectSearchDataAndCountOfCourses = createSelector(
//   selectSearchData,
//   selectCountOfCourses,
//   (searchData: string, countOfCourses: number) => { searchData, countOfCourses }
// );
