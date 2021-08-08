import { Component } from '@angular/core';
import { Person, CourseAuthor } from '../../models/person';
import { Store } from '@ngrx/store';
import { PeopleState } from '../../reducers/people.reducer';
import { CreatePersonAction } from '../../actions/people.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-person-page',
  templateUrl: './create-person-page.component.html',
  styleUrls: ['./create-person-page.component.scss']
})
export class CreatePersonPageComponent {
  authors: CourseAuthor[];

  constructor(
              private store: Store<PeopleState>,
              private route: ActivatedRoute,
              private router: Router) { }

  onSubmit(person: Person) {
    this.store.dispatch(new CreatePersonAction(person));
  }

  onCancel() {
    this.router.navigate(['/people']);
  }
}
