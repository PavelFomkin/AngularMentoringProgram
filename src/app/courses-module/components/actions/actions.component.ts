import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {

  constructor(private router: Router) {
  }

  addCourse() {
    this.router.navigateByUrl('/courses/new');
  }
}
