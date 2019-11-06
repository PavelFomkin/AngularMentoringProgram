import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: {
    register: jasmine.Spy,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [FormsModule],
      providers: [ {provide: AuthService, useValue: authService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
