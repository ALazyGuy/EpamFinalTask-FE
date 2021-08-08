import { Component, OnInit } from '@angular/core';
import { BreadcrumbsSegment } from 'src/app/core/models/breadcrumbs-segment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  segments: Set<BreadcrumbsSegment>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route.snapshot.firstChild;

        this.segments = new Set<BreadcrumbsSegment>();

        while (currentRoute && currentRoute.data && currentRoute.data.breadcrumb) {
          const newSegment = currentRoute.data.person
            ? { name: currentRoute.data.person.fullName }
            : currentRoute.data.breadcrumb;
          this.segments.add(newSegment);
          currentRoute = currentRoute.firstChild;
        }
      });
  }
}
