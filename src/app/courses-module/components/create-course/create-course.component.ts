import {Component} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Course} from '../../models/course';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'New Course', url: '/courses/new'},
  ];

  createCourse(newCourse: NgForm) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.httpClient.post<Course>('http://localhost:3004/courses', newCourse.form.value as Course, httpOptions)
      .subscribe((course: Course) => {
        console.log(course);
      });

    this.router.navigateByUrl('/courses');
  }

  goBack() {
    history.back();
  }
}
