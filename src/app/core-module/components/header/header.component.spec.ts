import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AuthService} from '../../../auth-module/services/auth.service';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component;
  let fixture: ComponentFixture<HeaderComponent>;

  let authServiceSpy: {
    isLoggedIn: jasmine.Spy,
    logout: jasmine.Spy,
    getCurrentUser: jasmine.Spy,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout', 'getCurrentUser']);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logo element has routing to main page', () => {
    fixture.detectChanges();
    const logoEl: HTMLElement = fixture.debugElement.query(By.css('#logo')).nativeElement;
    expect(logoEl.attributes.getNamedItem('routerLink').textContent).toBe('');
  });

  it('check authorization when page is loading, show the login tab when a user is not authorized', () => {
    const authService = TestBed.get(AuthService);
    authService.isLoggedIn.and.returnValue(false);

    fixture.detectChanges();
    const signOutEl = fixture.debugElement.query(By.css('#signOutEl'));
    const userNameEl = fixture.debugElement.query(By.css('#userNameEl'));
    const loginEl: HTMLElement = fixture.debugElement.query(By.css('#loginEl')).nativeElement;

    expect(authService.isLoggedIn.calls.count()).toBeGreaterThan(0);
    expect(signOutEl).toBeNull();
    expect(userNameEl).toBeNull();
    expect(loginEl.attributes.getNamedItem('routerLink').textContent).toBe('login');
  });

  it('userName element shows current user name when a user is authorized', () => {
    const authService = TestBed.get(AuthService);
    const currentUserName = 'Pavel';
    authService.isLoggedIn.and.returnValue(true);
    authService.getCurrentUser.and.returnValue(currentUserName);

    fixture.detectChanges();
    const userNameEl: HTMLElement = fixture.debugElement.query(By.css('#userNameEl')).nativeElement;

    expect(userNameEl.innerText).toBe(currentUserName);
    expect(authService.getCurrentUser.calls.count()).toBeGreaterThan(0);
  });

  it('logout button is active and trigger auth service by clicking when a user is authorized', () => {
    const authService = TestBed.get(AuthService);
    authService.isLoggedIn.and.returnValue(true);

    fixture.detectChanges();
    const userNameEl: HTMLElement = fixture.debugElement.query(By.css('#signOutEl')).nativeElement;
    const loginEl = fixture.debugElement.query(By.css('#loginEl'));

    userNameEl.click();

    expect(loginEl).toBeNull();
    expect(authService.logout.calls.count()).toBe(1);
    expect(userNameEl).toBeTruthy();
  });
});
