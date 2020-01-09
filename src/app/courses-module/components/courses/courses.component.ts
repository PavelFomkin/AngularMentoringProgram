import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Observable, of, Subject} from 'rxjs';
import {CourseService} from '../../services/course.service';
import {LoaderService} from '../../../core-module/services/loader.service';
import {CoursesState} from '../../store/courses.state';
import {select, Store} from '@ngrx/store';
import {
  LoadCoursesAction,
  SetCoursesAction,
  SetHasMoreCoursesFlagAction,
  SetSearchDataAction
} from '../../store/actions/courses.actions';
import {
  selectCountOfCourses,
  selectCourses,
  selectHasMoreCourses,
  selectSearchData
} from '../../store/selectors/courses.selector';
import {concat, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  noCoursesTitle: string = 'Courses not found';
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: 'Courses', url: '/courses'}
  ];

  loadedCourses: Observable<Course[]> = this.store$.select(selectCourses);
  hasLoadedCourses: Observable<boolean> = this.store$.select(selectCourses)
    .pipe(map(courses => courses.length > 0));
  hasMoreCourses: Observable<boolean> = this.store$.select(selectHasMoreCourses);
  searchSubject = new Subject<string>();
  searchData: string;

  constructor(private store$: Store<CoursesState>,
              private loaderService: LoaderService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() =>  this.loaderService.turnLoaderOn()),
      switchMap((search: string) => {
        return this.courseService.searchCourses(search);
      }),
    ).subscribe((courses: Course[]) => {
      this.store$.dispatch(new SetCoursesAction(courses));
      this.store$.dispatch(new SetHasMoreCoursesFlagAction(this.courseService.numberOfCoursesToLoad <= courses.length));
      this.loaderService.turnLoaderOff();
    });

    this.store$.dispatch(new LoadCoursesAction());
  }

  removeCourse(id: number) {
    // if (confirm('Do you really want to delete this course?')) {
    //   this.loaderService.turnLoaderOn();
    //   this.courseService.removeCourse(id)
    //     .subscribe(() => {
    //       this.loadedCourses = this.loadedCourses.filter(item => item.id !== id);
    //       this.loaderService.turnLoaderOff();
    //     });
    // }
  }

  searchCourses(searchData: string) {
    if (!!searchData && searchData.trim().length >= 3) {
      this.store$.dispatch(new SetSearchDataAction(searchData.trim()));
      this.searchSubject.next(this.searchData);
    } else if (!searchData) {
      this.store$.dispatch(new LoadCoursesAction());
    }
  }

  loadMore() {
    // this.store$.pipe(
    //   select(selectCountOfCourses),
    //   select(selectSearchData),
    //   map((a,b) => ));
    // this.store$.dispatch(new Load)
    // this.store$.select( selectSearchData).pipe(
    //   tap(searchData => {
    //
    //     this.courseService.loadMore().dispatch(searchData)
    //   })
    // );
    // this.loaderService.turnLoaderOn();
    // this.courseService.loadMore(this.loadedCourses.length, this.numberOfCoursesToLoad, this.searchData)
    //   .subscribe((items: Course[]) => {
    //     const expectedCountOfCourses = this.loadedCourses.length + this.numberOfCoursesToLoad;
    //     this.loadedCourses = [...this.loadedCourses, ...items];
    //     this.hasMoreCourses = expectedCountOfCourses <= this.loadedCourses.length;
    //     this.loaderService.turnLoaderOff();
    //   });
  }

  private getCourses() {
    // this.store
    // this.loaderService.turnLoaderOn();
    // this.courseService.getCourses(this.numberOfCoursesToLoad)
    //   .subscribe((items: Course[]) => {
    //     this.loadedCourses = items;
    //     this.hasMoreCourses = this.numberOfCoursesToLoad <= this.loadedCourses.length;
    //     this.loaderService.turnLoaderOff();
    //   });
  }
}
