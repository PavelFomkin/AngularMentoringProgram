import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  let router: Partial<Router>;
  // const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    router = { navigateByUrl: jasmine.createSpy('navigateByUrl')};
    TestBed.configureTestingModule({
      declarations: [ AuthService ],
      providers:
        [
          { provide: Router, useValue: router },
        ]
    });

    service = TestBed.get(AuthService);
  });
  // TestBed.configureTestingModule({
  //   declarations: [ AuthService ],
  //   providers:
  //     [
  //       { provide: Router, useValue: router },
  //     ]
  // }).compileComponents();

  it('should return current stage of currentUser field in LocalStorage', () => {
    localStorage.setItem('currentUser', 'userName');

    expect(service.isLoggedIn()).toBe(true);
  });
});


