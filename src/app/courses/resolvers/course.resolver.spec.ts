import { CourseResolver } from './course.resolver';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('CourseResolver', () => {
  let resolver: CourseResolver;
  let mockService;

  beforeEach(() => {
    mockService = {
      getItemById: jasmine.createSpy('getItemById')
    };

    resolver = new CourseResolver(mockService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve course', () => {
    const mockRoute = {
      params: { id: '1' }
    } as any as ActivatedRouteSnapshot;
    resolver.resolve(mockRoute);
    expect(mockService.getItemById).toHaveBeenCalledWith(+mockRoute.params.id);
  });
});
