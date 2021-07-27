import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService;
  let mockRouter;

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    guard = new AuthGuard(mockAuthService, mockRouter);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
