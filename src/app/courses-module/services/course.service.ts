import {Injectable} from '@angular/core';
import {Course} from '../models/course';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) {}

  getCourses(numberOfCoursesToLoad): Observable<Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + numberOfCoursesToLoad);
  }

  searchCourses(numberOfCoursesToLoad: number, searchData: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + numberOfCoursesToLoad
      + '&textFragment=' + searchData);
  }

  removeCourse(id: number) {
    return this.httpClient.delete<any>('http://localhost:3004/courses/' + id);
  }

  loadMore(startCourseNumber: number, numberOfCoursesToLoad: number, searchData: string): Observable<Course[]> {
    let attributes;
    if (searchData) {
      attributes = 'start=' + startCourseNumber
        + '&count=' + numberOfCoursesToLoad
        + '&textFragment=' + searchData;
    } else {
      attributes = 'start=' + startCourseNumber
        + '&count=' + numberOfCoursesToLoad;
    }

    return this.httpClient.get<Course[]>('http://localhost:3004/courses?' + attributes);
  }
}
