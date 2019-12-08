import {Component} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Course} from '../../models/course';
import {CourseService} from "../../services/course.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {

  constructor(private courseService: CourseService, private router: Router) { }

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'New Course', url: '/courses/new'},
  ];

  createCourse(newCourse: NgForm) {
    this.courseService.createCourse(newCourse.form.value as Course);
    this.router.navigateByUrl('/courses');
  }

  goBack() {
    history.back();
  }
}
