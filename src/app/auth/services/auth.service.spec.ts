import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {
      get: jasmine.createSpy('http.get'),
      post: jasmine.createSpy('http.post'),
      put: jasmine.createSpy('http.put'),
      delete: jasmine.createSpy('http.delete'),
    };

    service = new AuthService(mockHttp);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should log in', () => {

    });

    it('should store user data in local storage', () => {

    });
  });

  describe('#logout', () => {
    it('should log out', () => {

    });

    it('should remove user info', () => {

    });
  });

  describe('#getUserInfo', () => {
    it('should return stored user info', () => {

    });
  });

  afterAll(() => {
    localStorage.clear();
  });
});
