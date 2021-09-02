import { Person } from '../../models/person';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import {environment} from "../../../../environments/environment";
import { User } from "../../../auth/models/user";

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleItemComponent {
  @Input() person: Person;
  @Input() isAdmin: boolean | null;
  @Input() currentUser: User | null;

  @Output() edit = new EventEmitter<Person>();
  @Output() remove = new EventEmitter<Person>();
  @Output() arrest = new EventEmitter<Person>();

  getImageUrl() {
    return `${environment.API_URL}/static/${this.person.photoName}`;
  }

  onRemove() {
    this.remove.emit(this.person);
  }

  onEdit() {
    this.edit.emit(this.person);
  }

  onArrest() {
    this.arrest.emit(this.person);
  }
}
