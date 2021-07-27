import { Subject } from 'rxjs';
import { BreadcrumbsSegment } from './../../models/breadcrumbs-segment';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';

import { BreadcrumbsService } from '../../services/breadcrumbs.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const mockBreadcrumbsService = {
    segments$: new Subject<BreadcrumbsSegment[]>(),
    updateSegments(value: BreadcrumbsSegment[]) { this.segments$.next(value); }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      imports: [ RouterTestingModule, MatToolbarModule ],
      providers: [ { provide: BreadcrumbsService, useValue: mockBreadcrumbsService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should be empty in case of no segments', () => {
    const segments = fixture.debugElement.queryAll(By.css('.breadcrumbs__item'));
    const separators = fixture.debugElement.queryAll(By.css('.breadcrumbs__item__separator'));
    expect(segments.length).toEqual(0);
    expect(separators.length).toEqual(0);
  });

  it('should separate segments by slash', () => {
    const segments = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

    mockBreadcrumbsService.updateSegments(segments);
    fixture.detectChanges();

    const separators = fixture.debugElement.queryAll(By.css('.breadcrumbs__item__separator'));
    expect(separators.length).toEqual(segments.length - 1);
  });
});
