import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, OnChanges {

  constructor(private router: Router) {
    console.log('create a new actions component');
  }

  ngOnInit() {
    console.log('ngOnInit actions component');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges actions component');
    console.log(changes);
  }

  addCourse() {
    this.router.navigate(['/create-course']);
  }
}
