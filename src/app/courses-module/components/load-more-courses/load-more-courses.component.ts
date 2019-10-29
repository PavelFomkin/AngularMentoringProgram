import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-load-more-courses',
  templateUrl: './load-more-courses.component.html',
  styleUrls: ['./load-more-courses.component.css']
})
export class LoadMoreCoursesComponent implements OnInit {

  title: string = 'LOAD MORE';
  @Input() hasMoreCourses: boolean;
  @Output() loadMoreCourses: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  loadMore() {
    this.loadMoreCourses.emit();
  }
}
