import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CourseService} from '../../services/course.service';
import {LoaderService} from '../../../core-module/services/loader.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchSubject = new Subject<string>();

  numberOfCoursesToLoad: number = 5;
  hasMoreCourses: boolean = false;
  noCoursesTitle: string = 'Courses not found';
  searchData: string;
  loadedCourses: Course[];
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'}
  ];

  constructor(private courseService: CourseService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search: string) => {
        this.loaderService.turnLoaderOn();
        return this.courseService.searchCourses(this.numberOfCoursesToLoad, search);
      }),
    ).subscribe((items: Course[]) => {
      this.loadedCourses = items;
      this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
      this.loaderService.turnLoaderOff();
    });

    this.getCourses();
  }

  removeCourse(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.loaderService.turnLoaderOn();
      this.courseService.removeCourse(id)
        .subscribe(() => {
          this.loadedCourses = this.loadedCourses.filter(item => item.id !== id);
          this.loaderService.turnLoaderOff();
        });
    }
  }

  searchCourses(searchData: string) {
    if (!!searchData && searchData.trim().length >= 3) {
      this.searchData = searchData.trim();
      this.searchSubject.next(this.searchData);
    } else if (!searchData) {
      this.getCourses();
    }
  }

  loadMore() {
    this.loaderService.turnLoaderOn();
    this.courseService.loadMore(this.loadedCourses.length, this.numberOfCoursesToLoad, this.searchData)
      .subscribe((items: Course[]) => {
        const expectedCountOfCourses = this.loadedCourses.length + this.numberOfCoursesToLoad;
        this.loadedCourses = [...this.loadedCourses, ...items];
        this.hasMoreCourses = expectedCountOfCourses <= this.loadedCourses.length;
        this.loaderService.turnLoaderOff();
      });
  }

  private getCourses() {
    this.loaderService.turnLoaderOn();
    this.courseService.getCourses(this.numberOfCoursesToLoad)
      .subscribe((items: Course[]) => {
        this.loadedCourses = items;
        this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
        this.loaderService.turnLoaderOff();
      });
  }
}
