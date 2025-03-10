import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [MatInputModule,MatFormFieldModule, MatIconModule,MatButtonModule,FormsModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true
})
export class DetailsComponent {
  editableInformation: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string, extraInfo: string },
    private dialogRef: MatDialogRef<DetailsComponent>
  ) {
    this.editableInformation = this.data.extraInfo || '';
  }

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
    // Cerrar el diálogo y devolver la información editada
    this.dialogRef.close(this.editableInformation);
  }

  cancel() {
    this.dialogRef.close();
  }
}
