import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  noCursesTitle: string = 'Courses not found';

  constructor(private courseService: CourseService) {
    console.log('created a new courses component');
  }

  ngOnInit(): void {
    console.log('ngOnInit courses component');
    this.courses = this.courseService.getCourses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges courses component');
    console.log(changes);
  }

  removeCourse(id: number) {
    this.courses = this.courses.filter(course => id !== course.id);
  }
  searchCourses(searchData: string) {
    this.courses = this.courseService.getCoursesByName(searchData);
  }
}
