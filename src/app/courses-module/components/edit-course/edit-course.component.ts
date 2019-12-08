import {Component, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Course} from '../../models/course';
import {CourseService} from "../../services/course.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  private subscription: Subscription;
  private course2: Course;

  constructor(private courseService: CourseService,
              private activateRouter: ActivatedRoute,
              private router: Router) {
  }

  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'},
    {title: 'test', url: '/courses/:id'},
  ];

  updateCourse(newCourse: NgForm) {
    this.courseService.createCourse(newCourse.form.value as Course);
    this.router.navigateByUrl('/courses');
  }

  goBack() {
    history.back();
  }

  ngOnInit(): void {
    const param: number = this.activateRouter.snapshot.params['id'];
    // console.log("param:" + param);
    // console.log(this.courseService.getCourseById(2));
    // console.log(this.courseService.getCourseById(param));
    // this.course = this.courseService.getCourseById(this.activateRouter.snapshot.params['id']);
    this.subscription = this.activateRouter.params.subscribe(params => {
      this.course2 = this.courseService.getCourseById(param);
      console.log("=======================================================")
      console.log(param);
      console.log(this.courseService.getCourseById(3) as Course);
      console.log(this.course2);
      console.log("params.id " + params.id);
      console.log(this.courseService.getCourseById(params.id));
      console.log(this.courseService.getCourseById(param) as Course);
      console.log("=======================================================")
    });
  }
}
