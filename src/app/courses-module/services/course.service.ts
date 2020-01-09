import {Injectable} from '@angular/core';
import {Course} from '../models/course';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public numberOfCoursesToLoad: number = 5;

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + this.numberOfCoursesToLoad);
  }

  searchCourses(searchData: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + this.numberOfCoursesToLoad
      + '&textFragment=' + searchData);
  }

  removeCourse(id: number) {
    return this.httpClient.delete<any>('http://localhost:3004/courses/' + id);
  }

  loadMore(startCourseNumber: number, searchData: string): Observable<Course[]> {
    let attributes;
    if (searchData) {
      attributes = 'start=' + startCourseNumber
        + '&count=' + this.numberOfCoursesToLoad
        + '&textFragment=' + searchData;
    } else {
      attributes = 'start=' + startCourseNumber
        + '&count=' + this.numberOfCoursesToLoad;
    }

    return this.httpClient.get<Course[]>('http://localhost:3004/courses?' + attributes);
  }
}
