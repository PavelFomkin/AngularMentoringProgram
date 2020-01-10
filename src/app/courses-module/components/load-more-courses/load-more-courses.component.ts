import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-load-more-courses',
  templateUrl: './load-more-courses.component.html',
  styleUrls: ['./load-more-courses.component.css']
})
export class LoadMoreCoursesComponent {

  title: string = 'LOAD MORE';
  @Input() hasMoreCourses: boolean;
  @Output() loadMoreCourses: EventEmitter<void> = new EventEmitter<void>();

  loadMore() {
    this.loadMoreCourses.emit();
  }
}
