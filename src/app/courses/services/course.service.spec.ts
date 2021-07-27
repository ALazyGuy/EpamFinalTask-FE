import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
  let service: CourseService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {
      get: jasmine.createSpy('http.get'),
      post: jasmine.createSpy('http.post'),
      put: jasmine.createSpy('http.put'),
      delete: jasmine.createSpy('http.delete'),
    };

    service = new CourseService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get course list', () => {

  });

  it('should create course', () => {

  });

  it('should return item by id', () => {

  });

  it('should update course', () => {

  });

  it('should remove course', () => {

  });
});
