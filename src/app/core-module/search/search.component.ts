import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  searchData: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() {
    console.log('Created a new search component');
  }

  ngOnInit() {
    console.log('ngOnInit search component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges search component');
    console.log(changes);
  }

  searchCourses(): void {
    this.search.emit(this.searchData);
  }

}
