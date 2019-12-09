import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Course} from '../../models/course';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {

  private ID_FIELD: string = 'id';
  private subscription: Subscription;
  private course: Course;

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'course ', url: '/courses/:id'},
  ];

  constructor(private activateRouter: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    const param: number = this.activateRouter.snapshot.params[this.ID_FIELD];

    this.subscription = this.httpClient.get<Course>('http://localhost:3004/courses/' + param)
      .subscribe((course: Course) => {
        this.course = course;
        this.breadcrumbLinks[1].title += course.id.toString();
      });
  }

  updateCourse() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.httpClient.patch<Course>('http://localhost:3004/courses/' + this.course.id, this.course, httpOptions)
      .subscribe((course: Course) => {
        console.log(course);
      });
    this.router.navigateByUrl('/courses');
  }

  goBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
