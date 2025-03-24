import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import {Activity} from "../shared/classes/activity";
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})


export class ListComponent implements OnInit {

  MOVIE_DATA: Activity[] = [];
  SERIES_DATA: Activity[] = [];
  FOOD_DATA: Activity[] = [];
  PLAN_DATA: Activity[] = [];
  data:Activity[] = [];
  displayedColumnsForFood : string[] = ['food', 'details'];
  displayedColumnsForMovies : string[] = ['movie', 'platformName'];
  displayedColumnsForSeries : string[] = ['series', 'platformName'];
  displayedColumnsForPlans : string[] = ['plan', 'details'];
  foodDataSource = new MatTableDataSource(this.FOOD_DATA);
  movieDataSource = new MatTableDataSource(this.MOVIE_DATA);
  seriesDataSource = new MatTableDataSource(this.SERIES_DATA);
  planDataSource = new MatTableDataSource(this.PLAN_DATA);

  constructor(private iMatDialog: MatDialog, private firebaseService: FirebaseService){}

  ngOnInit() {
      this.firebaseService.getData().subscribe((data => {
        this.data = data;
        this.getMovie();
      })
    )
  }

  loadTableData() {
    this.getMovie();
    this.getSeries();
    this.getFood();
    this.getPlans();
  }

  filterFood(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.foodDataSource.filter = filterValue.trim().toLowerCase();
  }
  filterMovies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.movieDataSource.filter = filterValue.trim().toLowerCase();
  }
  filterSeries(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seriesDataSource.filter = filterValue.trim().toLowerCase();
  }
  filterPlans(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.planDataSource.filter = filterValue.trim().toLowerCase();
  }
  openDetails(activity: string, name: string, details: string) {
    const dialogRef = this.iMatDialog.open(DetailsComponent, {
      data: {
        title: activity,
        description: name,
        extraInfo: details
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveDetails(activity, name, result);
      }
    });
  }

  getMovie() {
    this.data.forEach(element => {
      if (element.type === 'pelicula') {
      }
    });
  }

  getSeries(){
    let stored = window.localStorage.getItem('series');
    if (!stored) return;
    
    const seriesEntries = stored.split(',').map(item => {
      const nameMatch = item.match(/La serie <b>(.*?)<\/b>/);
      const platformMatch = item.match(/se puede ver por <b>(.*?)<\/b>/);
      
      if (nameMatch && platformMatch) {
        return {
          name: nameMatch[1],
          platform: platformMatch[1]
        };
      }
      return null;
    }).filter(entry => entry);

    seriesEntries.forEach(entry => {
      if (entry) {
      }
    });
  }

  getFood(){
    let stored = window.localStorage.getItem('food');
    let storedDetails = window.localStorage.getItem('foodDetails') ? JSON.parse(window.localStorage.getItem('foodDetails') || '{}') : {};
    
    if (!stored) return;
    
    const foods = stored.split(',').map(item => {
      const match = item.match(/La comida es <b>(.*?)<\/b>/);
      const name = match ? match[1] : null;
      return {
        name,
        details: storedDetails[name || ''] || ''
      };
    }).filter(food => food.name);

    foods.forEach(food => {
      if (food.name) {
      }
    });
  }

  getPlans(){
    let stored = window.localStorage.getItem('plan');
    let storedDetails = window.localStorage.getItem('planDetails') ? JSON.parse(window.localStorage.getItem('planDetails') || '{}') : {};
    
    if (!stored) return;
    
    const plans = stored.split(',').map(item => {
      const match = item.match(/El plan es <b>(.*?)<\/b>/);
      const name = match ? match[1] : null;
      return {
        name,
        details: storedDetails[name || ''] || ''
      };
    }).filter(plan => plan.name);

    plans.forEach(plan => {
      if (plan.name) {
      }
    });
  }

  saveDetails(activity: string, name: string, details: string) {
    let storageKey = '';
    let currentDetails = {};
    
    switch(activity) {
      case 'película':
        storageKey = 'movieDetails';
        break;
      case 'serie':
        storageKey = 'seriesDetails';
        break;
      case 'comida':
        storageKey = 'foodDetails';
        break;
      case 'plan':
        storageKey = 'planDetails';
        break;
    }

    try {
      currentDetails = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      currentDetails = {};
    }

    currentDetails = { ...currentDetails, [name]: details };
    localStorage.setItem(storageKey, JSON.stringify(currentDetails));
  }


}
