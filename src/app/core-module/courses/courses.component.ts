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

  noCoursesTitle: string = 'Courses not found';
  searchData: string;
  availableNumberOfCourses: number;
  loadedCourses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
      {title: 'Courses', url: '/courses'}
    ];

  constructor(private courseService: CourseService) {
    console.log('created a new courses component');
  }

  ngOnInit(): void {
    console.log('ngOnInit courses component');
    this.availableNumberOfCourses = this.courseService.getNumberOfCourses();
    this.loadedCourses = this.availableNumberOfCourses > 0 ? this.courseService.getCourses(0) : [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges courses component');
    console.log(changes);
  }

  removeCourse(id: number) {
    this.courseService.removeCourse(id);
    this.loadedCourses = this.loadedCourses.filter(course => id !== course.id);
    this.availableNumberOfCourses = this.searchData ?
      this.courseService.getNumberOfCourses(this.searchData) :
      this.courseService.getNumberOfCourses();
  }

  searchCourses(searchData?: string) {
    if (searchData) {
      this.searchData = searchData.trim();
      this.availableNumberOfCourses = this.courseService.getNumberOfCourses(this.searchData);
      this.loadedCourses = this.availableNumberOfCourses > 0 ?
        this.courseService.getCourses(0, this.searchData) : [];
    } else {
      this.searchData = undefined;
      this.availableNumberOfCourses = this.courseService.getNumberOfCourses();
      this.loadedCourses = this.availableNumberOfCourses > 0 ?
        this.courseService.getCourses(0) : [];
    }
  }

  loadMore() {
    console.log('load more -----------------------------------------')
    if (this.searchData) {
      this.loadedCourses = [...this.loadedCourses, ...this.courseService.getCourses(this.loadedCourses.length, this.searchData)];
    } else {
      this.loadedCourses = [...this.loadedCourses, ...this.courseService.getCourses(this.loadedCourses.length)];
    }
  }
}
