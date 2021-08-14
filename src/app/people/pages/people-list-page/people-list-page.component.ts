import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PeopleState, getPeople } from '../../reducers/people.reducer';
import { LoadPeopleAction, RemovePersonAction } from '../../actions/people.actions';
import { FormControl } from '@angular/forms';
import { isAdmin } from "../../../auth/reducers/auth.reducer";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list-page.component.html',
  styleUrls: ['./people-list-page.component.scss']
})
export class PeopleListPageComponent implements OnInit {
  people$ = this.store.pipe(select(getPeople));
  isAdmin$ = this.store.pipe(select(isAdmin));

  searchInput = new FormControl();

  private debounceSubject = new Subject<string>();

  constructor(private store: Store<PeopleState>,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.loadPeople();

    this.debounceSubject
      .pipe(
        filter((value) => !value.length || value.length >= 3),
        debounceTime(1000)
      ).subscribe(() => {
        this.loadPeople();
      });

    this.searchInput.valueChanges.subscribe((value) => this.debounceSubject.next(value));
  }

  loadPeople() {
    this.store.dispatch(new LoadPeopleAction({ searchCriteria: this.searchInput.value }));
  }

  editPerson(person: Person) {
    this.router.navigate(['people', person.id]);
  }

  removePerson(person: Person) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.store.dispatch(new RemovePersonAction(person));
      }
    });
  }
}
