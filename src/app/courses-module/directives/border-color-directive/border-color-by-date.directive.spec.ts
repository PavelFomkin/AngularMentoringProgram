import {BorderColorByDateDirective} from './border-color-by-date.directive';
import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('BorderColorByDateDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BorderColorByDateDirective],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test element should be green because the date is before now and less than 2 weeks old', () => {
    fixture.detectChanges();

    expect(divEl.nativeElement.style.borderColor).toBe('green');
  });

  it('test element should be blue because the date is after now', () => {
    const now: Date = new Date();
    fixture.debugElement.componentInstance.date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getHours());
    fixture.detectChanges();

    expect(divEl.nativeElement.style.borderColor).toBe('blue');
  });

  it('test element should have no border because the date is more than 2 weeks old', () => {
    const now: Date = new Date();
    fixture.debugElement.componentInstance.date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15, now.getHours());
    fixture.detectChanges();

    expect(divEl.nativeElement.style.border).toBe('');
  });
});

@Component({
  template: `<div [appBorderColorByDate]="date"></div>`
})
class TestComponent {
  date: Date = new Date();
}
