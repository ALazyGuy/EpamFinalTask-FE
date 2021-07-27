import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MinutesToTimePipe } from '../../../courses/pipes/minutes-to-time.pipe';
import { CourseItemComponent } from './course-item.component';
import { CreationDateStatusDirective } from '../../../courses/directives/creation-date-status.directive';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <app-course-item [course]="course" (edit)="edit($event)" (remove)="remove($event)">
    </app-course-item>
  `
})
class TestHostComponent {
  edit = jasmine.createSpy('edit');
  remove = jasmine.createSpy('remove');
  course = {
    id: 1,
    name: 'Title 1',
    date: '2018-05-09',
    length: 90,
    description: 'Description'
  };
}

describe('CourseItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, MinutesToTimePipe, TestHostComponent, CreationDateStatusDirective ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain course title info', () => {
    const element = fixture.debugElement.query(By.css('.card-header__title'));
    expect(element.nativeElement.innerText).toContain(testHost.course.name.toUpperCase());
  });

  it('should contain course duration info', () => {
    const minutesToTimePipe = new MinutesToTimePipe();
    const element = fixture.debugElement.query(By.css('.card-header__info__duration'));
    expect(element.nativeElement.innerText).toContain(minutesToTimePipe.transform(testHost.course.length));
  });

  it('should contain course creation date info', () => {
    const datePipe = new DatePipe('en-US');
    const element = fixture.debugElement.query(By.css('.card-header__info__date'));
    expect(element.nativeElement.innerText).toContain(datePipe.transform(testHost.course.date, 'MM.dd.yyyy'));
  });

  it('should contain course description info', () => {
    const element = fixture.debugElement.query(By.css('.course-item__content__desctiption'));
    expect(element.nativeElement.innerText).toContain(testHost.course.description);
  });

  it('should emit edit event', () => {
    const element = fixture.debugElement.query(By.css('.course-item__actions__edit'));
    element.triggerEventHandler('click', null);
    expect(testHost.edit).toHaveBeenCalledWith(testHost.course);
  });

  it('should emit remove event', () => {
    const element = fixture.debugElement.query(By.css('.course-item__actions__remove'));
    element.triggerEventHandler('click', null);
    expect(testHost.remove).toHaveBeenCalledWith(testHost.course);
  });
});
