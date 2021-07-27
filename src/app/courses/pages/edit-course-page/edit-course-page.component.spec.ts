import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursePageComponent } from './edit-course-page.component';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Course } from '../../models/course';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';

@Component({
  selector: 'app-course-form',
  template: `

  `
})
class CourseFormStubComponent {
  @Input() course: Course;
  @Output() submit = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter();
}

describe('EditCoursePageComponent', () => {
  let component: EditCoursePageComponent;
  let fixture: ComponentFixture<EditCoursePageComponent>;
  let form: CourseFormStubComponent;
  let mockService;
  let mockRouter;
  let mockRoute;
  let mockBreadcrumbsService;

  const courseMock = {
    id: 1,
    title: 'Title 1',
    creationDate: '2018-05-09',
    duration: 34,
    description: 'Description 1'
  };

  beforeEach(async(() => {
    mockService = {
      createCourse: jasmine.createSpy('createCourse')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockRoute = {
      snapshot: {
        data: {
          course: courseMock,
        },
        parent: {
          data: {
            breadcrumb: { name: 'Create Course' },
          }
        }
      }
    };

    mockBreadcrumbsService = {
      segments$: of([]),
      updateSegments: jasmine.createSpy('updateSegments')
    };

    TestBed.configureTestingModule({
      declarations: [
        EditCoursePageComponent,
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
    fixture = TestBed.createComponent(EditCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    form = TestBed.createComponent(CourseFormStubComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
