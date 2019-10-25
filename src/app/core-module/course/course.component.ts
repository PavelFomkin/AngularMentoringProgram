import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../entities/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
  }

  public removeCourse() {
    return this.remove.emit(this.course.id);
  }

}
