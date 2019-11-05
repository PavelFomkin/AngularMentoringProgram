import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Course} from '../../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  @Input() course: Course;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  public removeCourse() {
    return this.remove.emit(this.course.id);
  }

}
