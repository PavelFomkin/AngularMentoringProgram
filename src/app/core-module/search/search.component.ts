import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchData: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit search');
  }

  searchCourses(): void {
    this.search.emit(this.searchData);
  }

}
