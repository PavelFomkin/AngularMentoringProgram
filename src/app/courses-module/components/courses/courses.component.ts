import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, mergeAll, switchMap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchRequest = new Subject();

  numberOfCoursesToLoad: number = 5;
  hasMoreCourses: boolean = false;
  noCoursesTitle: string = 'Courses not found';
  searchData: string;
  loadedCourses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'}
  ];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + this.numberOfCoursesToLoad)
      .subscribe((items: Course[]) => {
        this.loadedCourses = items;
        this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
      });
  }

  removeCourse(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.httpClient.delete<void>('http://localhost:3004/courses' + id)
        .subscribe(() => {
          this.loadedCourses = this.loadedCourses.filter(item => item.id !== id);
        });
    }
  }

  searchCourses(searchData: string) {
    this.searchRequest.next(searchData);

    // this.loadedCourses = [];
    this.searchData = searchData ? searchData.trim() : '';

    this.searchRequest.pipe(
      filter((text: string) => !!text || text.length >= 3),
      distinctUntilChanged(),
      throttleTime(250),
      switchMap(() =>
        this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + this.numberOfCoursesToLoad
        + '&textFragment=' + this.searchData)),
    ).subscribe((items: Course[]) => {
      this.loadedCourses = items;
      this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
    });

    // this.httpClient.get<Course[]>('http://localhost:3004/courses?start=0&count=' + this.numberOfCoursesToLoad
    //   + '&textFragment=' + this.searchData)
    //   .subscribe((items: Course[]) => {
    //     this.loadedCourses = items;
    //     this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
    //   });
  }

  loadMore() {
    let attributes;
    if (this.searchData) {
      attributes = 'start=' + this.loadedCourses.length
        + '&count=' + this.numberOfCoursesToLoad
        + '&textFragment=' + this.searchData;
    } else {
      attributes = 'start=' + this.loadedCourses.length
        + '&count=' + this.numberOfCoursesToLoad;
    }
    this.httpClient.get<Course[]>('http://localhost:3004/courses?' + attributes)
      .subscribe((items: Course[]) => {
        const expectedCountOfCourses = this.loadedCourses.length + this.numberOfCoursesToLoad;
        this.loadedCourses = [...this.loadedCourses, ...items];
        this.hasMoreCourses = expectedCountOfCourses <= this.loadedCourses.length;
      });
  }
}
