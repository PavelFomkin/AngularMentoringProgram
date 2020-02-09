import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionsComponent} from './actions.component';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [ {provide: Router, useValue: routerSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('"add" button works and navigate to "create-course" page', () => {
    routerSpy = TestBed.get(Router);

    fixture.detectChanges();
    const addCourseEl: HTMLElement = fixture.debugElement.query(By.css('#add-course-button')).nativeElement;

    addCourseEl.click();

    expect(routerSpy.navigate.calls.count()).toBe(1);
    expect(routerSpy.navigate.calls.first().args[0].toString()).toBe('/create-course');
  });
});
