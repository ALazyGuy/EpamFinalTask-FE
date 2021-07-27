import { CourseService } from './../../services/course.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoursePageComponent } from './create-course-page.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-form',
  template: `

  `
})
class CourseFormStubComponent {
  @Output() submit = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter();
}

describe('CreateCoursePageComponent', () => {
  let component: CreateCoursePageComponent;
  let fixture: ComponentFixture<CreateCoursePageComponent>;
  let form: CourseFormStubComponent;
  let mockService;
  let mockRouter;
  let mockRoute;
  let mockBreadcrumbsService;

  beforeEach(async(() => {
    mockService = {
      createCourse: jasmine.createSpy('createCourse')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockRoute = {
      snapshot: {
        parent: {
          data: { breadcrumb: { name: 'Create Course' } }
        }
      }
    };

    mockBreadcrumbsService = {
      segments$: of([]),
      updateSegments: jasmine.createSpy('updateSegments')
    };

    TestBed.configureTestingModule({
      declarations: [
        CreateCoursePageComponent,
        CourseFormStubComponent,
      ],
      providers: [
        { provide: CourseService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: BreadcrumbsService, useValue: mockBreadcrumbsService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    form = TestBed.createComponent(CourseFormStubComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
