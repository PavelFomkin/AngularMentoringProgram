import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchWrapperComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search button triggers the event with an input value', () => {
    const testSearchData = 'Angular';
    const searchInput: HTMLInputElement = fixture.debugElement.children[0].query(By.css('input')).nativeElement;
    const searchButton: HTMLElement = fixture.debugElement.children[0].query(By.css('button')).nativeElement;
    const spy = spyOn(component.search, 'emit');

    searchInput.value = testSearchData;
    searchInput.dispatchEvent(new Event('input'));
    searchButton.click();

    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.allArgs()[0].toString()).toBe(testSearchData);
  });
});

@Component({
  selector: 'app-search-wrapper',
  template: `<app-search (search)="testOutput($event)"></app-search>`,
})
export class SearchWrapperComponent {
  testOutput(searchData: string): void { }
}
