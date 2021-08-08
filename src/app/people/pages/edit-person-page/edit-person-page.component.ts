import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person';
import { Store } from '@ngrx/store';
import { PeopleState } from '../../reducers/people.reducer';
import { EditPersonAction } from '../../actions/people.actions';

@Component({
  selector: 'app-edit-person-page',
  templateUrl: './edit-person-page.component.html',
  styleUrls: ['./edit-person-page.component.scss']
})
export class EditPersonPageComponent implements OnInit {
  person: Person;

  constructor(private store: Store<PeopleState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.person = this.route.snapshot.data['person'];
  }

  onSubmit(person: Person) {
    this.store.dispatch(new EditPersonAction(person));
  }

  onCancel() {
    this.router.navigate(['/people']);
  }

}
