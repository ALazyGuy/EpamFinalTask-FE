import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Person } from '../../models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, of } from "rxjs";
import { PeopleService } from "../../services/people.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isCreateMode: boolean;

  fileName: string;
  file: File;
  previewUrl: SafeResourceUrl;

  @Input() person: Person = {} as Person;

  @Output() save = new EventEmitter<Person>();
  @Output() cancel = new EventEmitter();

  @ViewChildren('customFormControl') customControls: QueryList<any>;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.isCreateMode = !this.person || !Object.keys(this.person).length;
    this.personForm = this.fb.group({
      id: [this.person.id],
      fullName: [this.person.fullName, [Validators.required, Validators.maxLength(45)]],
      cash: [this.person.cash, Validators.required],
      status: [this.person.status],
    });

    if (!this.isCreateMode) {
      this.previewUrl = `${environment.API_URL}/static/${this.person.photoName}`;

      this.personForm.controls['fullName'].disable();
      this.personForm.controls['cash'].disable();

      if (this.person.status) {
        this.personForm.controls['status'].disable();
      }
    }
  }

  createCustomErrorStateMatcher(controlName: string) {
    return {
      isErrorState: () => {
        return this.personForm.controls[controlName].touched && this.personForm.controls[controlName].invalid;
      },
      hasError: (error: string) => {
        return this.personForm.controls[controlName].hasError(error);
      }
    };
  }

  onFileChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    console.log(file);
    this.file = file;
    this.fileName = file.name;
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  }

  onSubmit(): void {
    let obs: Observable<any> = of(true);

    if (this.isCreateMode && this.fileName) {
      obs = this.peopleService.uploadImage(this.file);
    }

    obs.subscribe(() => {
      const {value} = this.personForm;
      let {id, status, ...user} = value;

      user = !this.isCreateMode
        ? {
          ...user,
          id,
          status,
          cash: this.person.cash
        } : {
          ...user,
          photoName: this.file.name
        }

      this.save.emit(user);
    })
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

