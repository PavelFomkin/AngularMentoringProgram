import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchData: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  searchCourses(): void {
    this.search.emit(this.searchData);
  }

}
