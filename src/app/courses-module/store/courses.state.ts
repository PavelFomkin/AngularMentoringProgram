import {Course} from '../models/course';

export interface CoursesState {
  courses: Course[];
  hasMoreCourses: boolean;
  searchData: string;
}
