import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {CourseService} from '../../services/course.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  numberOfCoursesToLoad: number = 5;
  hasMoreCourses: boolean = false;
  noCoursesTitle: string = 'Courses not found';
  searchData: string;
  loadedCourses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'}
  ];

  constructor(private courseService: CourseService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Course[]>('http://localhost:3004/courses/?start=0&count=' + this.numberOfCoursesToLoad)
      .subscribe((items: Course[]) => {
        this.loadedCourses = items;
        this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
      });
  }

  removeCourse(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.httpClient.delete<void>('http://localhost:3004/courses/' + id)
        .subscribe(() => {
          this.loadedCourses = this.loadedCourses.filter(item => item.id !== id);
        });
    }
  }

  searchCourses(searchData?: string) {
    // if (searchData) {
    //   this.searchData = searchData.trim();
    //   this.numberOfCoursesOnPage = this.courseService.getNumberOfCourses(this.searchData);
    //   this.loadedCourses = this.numberOfCoursesOnPage > 0 ?
    //     this.courseService.getCourses(0, this.searchData) : [];
    // } else {
    //   this.searchData = undefined;
    //   this.numberOfCoursesOnPage = this.courseService.getNumberOfCourses();
    //   this.loadedCourses = this.numberOfCoursesOnPage > 0 ?
    //     this.courseService.getCourses(0) : [];
    // }
  }

  loadMore() {
    let attributes;
    if (this.searchData) {
      attributes = 'start=' + this.loadedCourses.length
        + '&count=' + this.numberOfCoursesToLoad
        + 'textFragment=' + this.searchData;
    } else {
      attributes = 'start=' + this.loadedCourses.length
        + '&count=' + this.numberOfCoursesToLoad;
    }
    this.httpClient.get<Course[]>('http://localhost:3004/courses/?' + attributes)
      .subscribe((items: Course[]) => {
        let expectedCountOfCourses = this.loadedCourses.length + this.numberOfCoursesToLoad;
        this.loadedCourses = [...this.loadedCourses, ...items];
        this.hasMoreCourses = expectedCountOfCourses <= this.loadedCourses.length;
      });
  }
}
