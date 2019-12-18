import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {Course} from '../../models/course';
import {BorderColorByDateDirective} from '../../directives/border-color-directive/border-color-by-date.directive';
import {TopRatedDirective} from '../../directives/top-rated-directive/top-rated.directive';
import {DurationPipe} from '../../pipes/duration-pipe/duration-pipe.pipe';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, CourseWrapperComponent, BorderColorByDateDirective, TopRatedDirective, DurationPipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input works', () => {
    const courseTitleEl = fixture.debugElement.children[0].query(By.css('h4')).nativeElement;

    expect(courseTitleEl.innerText).toBe(fixture.debugElement.componentInstance.course.name);
  });

  it('trigger event by clicking remove course', () => {
    const removeButton: HTMLInputElement = fixture.debugElement.children[0].query(By.css('#removeButton')).nativeElement;
    const spy = spyOn(component.remove, 'emit');

    removeButton.click();

    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.allArgs()[0].toString()).toEqual(fixture.debugElement.componentInstance.course.id.toString());
  });
});

@Component({
  selector: 'app-course-wrapper',
  template: `<app-course [course]="course" (remove)="testOutput($event)"></app-course>`,
})
export class CourseWrapperComponent {
  course: Course = {
    id: 1,
    name: 'ANGULAR COURSE',
    description: 'description',
    length: 30,
    date: new Date(),
    isTopRated: true
  };
  testOutput(courseId: number): void {}
}
