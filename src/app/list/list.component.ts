import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

export interface Food {
  food: string;
  details:string;
}
export interface Movie {
  movieName: string;
  platformName: string;
}
export interface Plan {
  plan: string;
  details: string;
}

const FOOD_DATA: Food[] = [
  {food: 'pizza', details: 'Compre en X restaurante y no me gustaron'},
  {food: 'empanadas', details: 'Compre en X restaurante y no me gustaron'},
  {food: 'tarta', details: 'Compre en X restaurante y no me gustaron'}
];

const MOVIE_DATA: Movie[] = [
{ movieName: 'Batman', platformName: 'Netflix'},
{ movieName: 'SpiderMan', platformName: 'Netflix'},
{ movieName: 'SuperMan', platformName: 'Netflix'},
]

const PLAN_DATA: Plan[] = [
  {plan: 'Playa', details: 'Llevar off para los mosquitos'},
  {plan: 'Montaña', details: 'Llevar mucha agua y curitas para las ampollas'},
  {plan: 'Cine', details: 'Los miercoles está mas barato y los lunes está en inglés'}
];

@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})


export class ListComponent {
  displayedColumnsForFood : string[] = ['food', 'details'];
  displayedColumnsForMovies : string[] = ['movie', 'platformName'];
  displayedColumnsForPlans : string[] = ['plan', 'details'];
  foodDataSource = new MatTableDataSource(FOOD_DATA);
  movieDataSource = new MatTableDataSource(MOVIE_DATA);
  planDataSource = new MatTableDataSource(PLAN_DATA);

  constructor(private iMatDialog: MatDialog){}

  filterFood(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.foodDataSource.filter = filterValue.trim().toLowerCase();
  }
  filterMovies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.movieDataSource.filter = filterValue.trim().toLowerCase();
  }
  filterPlans(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.planDataSource.filter = filterValue.trim().toLowerCase();
  }
  openDetails(activity:string){
    this.iMatDialog.open(DetailsComponent,{data:{activity}});
  }
}
