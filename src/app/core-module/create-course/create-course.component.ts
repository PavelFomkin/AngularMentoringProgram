import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BreadcrumbLink} from '../../entities/breadcrumb-link';
import {Course} from '../../entities/course';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnChanges {

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'New Course', url: '/create-course'},
  ];
  newCourse: Course;

  constructor() {
    console.log('create a new create-course component');
  }

  ngOnInit() {
    console.log('ngOnInit create-course component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges create-course component');
    console.log(changes);
  }

  createCourse() {
    alert('not yet');
  }
}
