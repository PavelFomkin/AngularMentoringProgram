import {Component, OnInit} from '@angular/core';
import {Course} from '../entities/course';
import {CourseService} from '../services/course.service';
import {BreadcrumbLink} from '../entities/breadcrumb-link';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  breadcrumbLinks: BreadcrumbLink[] = [
      {title: 'Courses', url: 'courses'}
    ];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

}
