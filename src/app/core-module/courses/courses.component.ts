import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../entities/course';
import {BreadcrumbLink} from '../../entities/breadcrumb-link';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @Input() courses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
      {title: 'Courses', url: 'courses'}
    ];

  ngOnInit() {
  }
}
