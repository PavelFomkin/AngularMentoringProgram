import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbLink} from '../../models/breadcrumb-link';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input() links: BreadcrumbLink[];
}
