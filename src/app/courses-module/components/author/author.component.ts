import {Component, Input} from '@angular/core';
import {Author} from '../../models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent {

  @Input() author: Author;
}
