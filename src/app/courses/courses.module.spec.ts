import { CoursesModule } from './courses.module';

describe('CoursesModule', () => {
  let courseListModule: CoursesModule;

  beforeEach(() => {
    courseListModule = new CoursesModule();
  });

  it('should create an instance', () => {
    expect(courseListModule).toBeTruthy();
  });
});
