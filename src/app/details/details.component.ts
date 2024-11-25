import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { activity: string }) {}
  get activity(): string {
    return this.data.activity;
  }
}
