import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../entities/breadcrumb-link';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() links: BreadcrumbLink[];

  constructor() { }

  ngOnInit() {
  }

}
