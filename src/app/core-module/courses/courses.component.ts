import {Component, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../entities/course';
import {BreadcrumbLink} from '../../entities/breadcrumb-link';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnChanges {

  courses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
      {title: 'Courses', url: '/courses'}
    ];

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit courses');
    this.courses = this.courseService.getCourses();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges courses');
  }

  removeCourse(id: number) {
    this.courses = this.courses.filter(course => id !== course.id);
  }

  searchCourses(searchData: string) {
    this.courses = this.courseService.getCoursesByName(searchData);
  }
}
