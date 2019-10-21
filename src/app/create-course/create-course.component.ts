import { Component, OnInit } from '@angular/core';
import {BreadcrumbLink} from '../entities/breadcrumb-link';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'New Course', url: '/create-course'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
