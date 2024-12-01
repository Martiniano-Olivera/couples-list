import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [MatInputModule,MatFormFieldModule, MatIconModule,MatButtonModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  editableInformation = this.details;
  originalEditableInformation = this.details;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, extraInfo: string }) {}
  get activity(): string {
    return this.data.title;
  }
  get name() {
    return this.data.description;
  }

  get details() {
    return this.data.extraInfo;
  }
saveChanges() {
    console.log(this.activity);
}
}
