import {Component, OnInit} from '@angular/core';
import {Alert, AuthService} from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  repeatedPassword: string;
  error: Alert;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  register() {
    this.error = this.authService.register(this.username, this.password, this.repeatedPassword);
  }

  goBack() {
    window.history.back();
  }
}
