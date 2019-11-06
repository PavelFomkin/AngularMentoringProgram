import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreadcrumbComponent} from './breadcrumb.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BreadcrumbLink} from '../../models/breadcrumb-link';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent, BreadcrumbWrapperComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input works and active link is the last one', () => {
    const currentLink: HTMLElement = fixture.debugElement.query(By.css('#breadcrumb-current-link a')).nativeElement;
    const otherLinks = fixture.debugElement.queryAll(By.css('.breadcrumb-link a'));

    expect(component.links.length).toBe(3);
    expect(currentLink.attributes.getNamedItem('href').value).toBe('/edit');
    expect(currentLink.innerText).toBe('edit');
    expect(otherLinks.length).toBe(2);
    expect(otherLinks[0].nativeElement.attributes.getNamedItem('href').value).toBe('/courses');
    expect(otherLinks[1].nativeElement.attributes.getNamedItem('href').value).toBe('/course');
  });
});

@Component({
  selector: 'app-breadcrumb-wrapper',
  template: `<app-breadcrumb [links]=links></app-breadcrumb>`,
})
export class BreadcrumbWrapperComponent {
  links: BreadcrumbLink[] = [
    {title: 'courses', url: '/courses'},
    {title: 'course', url: '/course'},
    {title: 'edit', url: '/edit'},
  ];
}
