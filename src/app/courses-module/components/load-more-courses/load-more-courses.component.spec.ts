import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreCoursesComponent } from './load-more-courses.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('LoadMoreCoursesComponent', () => {
  let component: LoadMoreCoursesComponent;
  let fixture: ComponentFixture<LoadMoreCoursesWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreCoursesComponent, LoadMoreCoursesWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreCoursesWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component is active when input property is true', () => {
    const loadMoreEl = fixture.debugElement.children[0].query(By.css('#load-more-frame'));

    expect(loadMoreEl.classes.disabled).toBe(undefined);
  });

  it('component is disabled when input property is false', () => {
    fixture.debugElement.componentInstance.hasMoreCourses = false;

    const loadMoreEl = fixture.debugElement.children[0].query(By.css('#load-more-frame'));
    fixture.detectChanges();

    expect(loadMoreEl.classes.disabled).toBe(true);
  });

  it('trigger event by clicking load more', () => {
    const loadMoreEl: HTMLInputElement = fixture.debugElement.children[0].query(By.css('#load-more-frame')).nativeElement;
    const spy = spyOn(component.loadMoreCourses, 'emit');

    loadMoreEl.click();

    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);
  });
});

@Component({
  selector: 'app-load-more-wrapper',
  template: `<app-load-more-courses [hasMoreCourses]="hasMoreCourses" (loadMoreCourses)="testOutput()"></app-load-more-courses>`,
})
export class LoadMoreCoursesWrapperComponent {
  hasMoreCourses: boolean = true;
  testOutput(): void { }
}
