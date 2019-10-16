import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private footerText: string = 'Copyright © Videocourses. All rights reserved';

  constructor() { }

  ngOnInit() {
  }

}
