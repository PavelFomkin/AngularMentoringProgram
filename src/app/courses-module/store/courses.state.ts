import {Course} from '../models/course';

export interface CoursesState {
  courses: Course[];
  editableCourse: Course;
  hasMoreCourses: boolean;
  searchData: string;
}
