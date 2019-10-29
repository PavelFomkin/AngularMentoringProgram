import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Course} from '../../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnChanges {

  @Input() course: Course;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('created a new component');
  }

  ngOnInit() {
    console.log('ngOnInit ' + this.course.title + ' component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges ' + this.course.title + ' component');
    console.log(changes);
  }

  public removeCourse() {
    return this.remove.emit(this.course.id);
  }

}
