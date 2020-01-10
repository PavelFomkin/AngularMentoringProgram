import {Injectable} from '@angular/core';
import {Course} from '../models/course';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public numberOfCoursesToLoad: number = 5;

  constructor(private httpClient: HttpClient) { }

  getCourses(searchData?: string): Observable<Course[]> {
    let attributes = 'start=0&count=' + this.numberOfCoursesToLoad;
    if (searchData) {
      attributes += '&textFragment=' + searchData;
    }

    return this.httpClient.get<Course[]>('http://localhost:3004/courses?' + attributes);
  }

  loadMore(startCourseNumber: number, searchData?: string): Observable<Course[]> {
    let attributes = 'start=' + startCourseNumber
      + '&count=' + this.numberOfCoursesToLoad;
    if (searchData) {
      attributes += '&textFragment=' + searchData;
    }

    return this.httpClient.get<Course[]>('http://localhost:3004/courses?' + attributes);
  }

  getCourse(id: number): Observable<Course> {
    return this.httpClient.get<Course>('http://localhost:3004/courses/' + id);
  }

  removeCourse(id: number) {
    return this.httpClient.delete<any>('http://localhost:3004/courses/' + id);
  }

  createCourse(course: Course) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post<Course>('http://localhost:3004/courses', course, httpOptions);
  }

  updateCourse(course: Course) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.patch<Course>('http://localhost:3004/courses/' + course.id, course, httpOptions);
  }
}
