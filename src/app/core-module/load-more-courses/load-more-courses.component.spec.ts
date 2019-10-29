import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreCoursesComponent } from './load-more-courses.component';

describe('LoadMoreCoursesComponent', () => {
  let component: LoadMoreCoursesComponent;
  let fixture: ComponentFixture<LoadMoreCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
