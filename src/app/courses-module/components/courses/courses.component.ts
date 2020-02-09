import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {BreadcrumbLink} from '../../../shared-module/models/breadcrumb-link';
import {Observable, Subject, Subscription} from 'rxjs';
import {CoursesState} from '../../store/courses.state';
import {Store} from '@ngrx/store';
import {
  GetCoursesAction,
  GetCoursesBySearchDataAction,
  GetMoreCoursesAction,
  RemoveCourseFromBEAction,
  ResetSearchDataAction,
  SetSearchDataAction
} from '../../store/actions/courses.actions';
import {selectCourses, selectHasMoreCourses} from '../../store/selectors/courses.selector';
import {debounceTime, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  breadcrumbLinks: BreadcrumbLink[] = [
    {title: '', url: '/courses'}
  ];

  loadedCourses: Observable<Course[]> = this.store$.select(selectCourses);
  hasLoadedCourses: Observable<boolean> = this.store$.select(selectCourses)
    .pipe(map(courses => courses.length > 0));
  hasMoreCourses: Observable<boolean> = this.store$.select(selectHasMoreCourses);
  searchSubject = new Subject<string>();
  searchForm: FormGroup;
  searchSubscription: Subscription;

  constructor(private store$: Store<CoursesState>,
              private translate: TranslateService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(searchDate => searchDate.length >= 3),
      tap(searchData => {
        this.store$.dispatch(new SetSearchDataAction(searchData));
        this.store$.dispatch(new GetCoursesBySearchDataAction(searchData));
      })
    ).subscribe();
    this.searchSubscription = this.searchForm.get('search').valueChanges.subscribe(value => this.searchCourses(value));
    this.translate.stream('BREAD_CRUMB.COURSES').pipe(tap(value => this.breadcrumbLinks[0].title = value)).subscribe();

    this.store$.dispatch(new GetCoursesAction());
  }

  removeCourse(id: number) {
    if (confirm('Do you really want to delete this course?')) {
      this.store$.dispatch(new RemoveCourseFromBEAction(id));
    }
  }

  searchCourses(searchData: string) {
    if (searchData.length === 0) {
      this.store$.dispatch(new ResetSearchDataAction());
      this.store$.dispatch(new GetCoursesAction());
    } else {
      this.searchSubject.next(searchData.trim());
    }
  }

  loadMore() {
    this.store$.dispatch(new GetMoreCoursesAction());
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
