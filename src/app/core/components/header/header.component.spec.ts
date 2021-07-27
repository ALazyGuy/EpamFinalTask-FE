import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Directive({ // tslint:disable-next-line
  selector: '[routerLink]'
})
class NoopRouterLinkDirective {
  @Input() routerLink: any;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService;
  let mockRouter;

  let isAuthenticated = false;

  const mockUser = {
    id: 1,
    firstName: 'First',
    lastName: 'Last'
  };

  beforeEach(async(() => {
    mockAuthService = {
      logout: jasmine.createSpy('logout').and.returnValue(of(false)),
      isAuthenticated$: of(isAuthenticated),
      getUserInfo: jasmine.createSpy('getUserInfo').and.returnValue(mockUser),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, NoopRouterLinkDirective ],
      imports: [ MatButtonModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user is logged out', () => {
    beforeAll(() => {
      isAuthenticated = false;
    });

    it('should retrive login page by login button click', () => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      button.triggerEventHandler('click', null);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  xdescribe('user is logged in', () => {
    beforeAll(() => {
      isAuthenticated = true;
    });

    it('should show current user first and last name', () => {
      const userInfo = fixture.debugElement.query(By.css('.user-controls__info'));
      expect(userInfo.nativeElement.innerText).toEqual(`${mockUser.firstName} ${mockUser.lastName}`);
    });

    it('should logout by logout button click', () => {
      const button = fixture.debugElement.query(By.css('.user-controls button'));
      button.triggerEventHandler('click', null);
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
