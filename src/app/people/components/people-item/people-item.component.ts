import { Person } from '../../models/person';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleItemComponent {
  @Input() person: Person;

  @Output() edit = new EventEmitter<Person>();
  @Output() remove = new EventEmitter<Person>();

  onRemove() {
    this.remove.emit(this.person);
  }

  onEdit() {
    this.edit.emit(this.person);
  }
}
