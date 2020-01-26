import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from '../../models/course';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {

  @Input() course: Course;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor(private translate: TranslateService) {
  }

  public removeCourse() {
    return this.remove.emit(this.course.id);
  }

}
