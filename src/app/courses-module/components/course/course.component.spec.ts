import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {Course} from '../../models/course';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, CourseWrapperComponent]
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

    expect(courseTitleEl.innerText).toBe(fixture.debugElement.componentInstance.course.title);
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
    title: 'Angular course',
    description: 'description',
    duration: 30,
    creationDate: new Date()
  };
  testOutput(courseId: number): void {}
}
