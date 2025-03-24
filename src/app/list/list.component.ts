import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import {Activity, ActivityNameAndPlatform, activityType} from "../shared/classes/activity";
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})


export class ListComponent implements OnInit {

  MOVIE_DATA: ActivityNameAndPlatform[] = [];
  SERIES_DATA: ActivityNameAndPlatform[] = [];
  FOOD_DATA: ActivityNameAndPlatform[] = [];
  PLAN_DATA: ActivityNameAndPlatform[] = [];
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
        this.getData();
      })
    )
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

  getData() {
    this.data.forEach(element => {
      if (element.type === activityType.MOVIE) {
        this.MOVIE_DATA.push({name: element.name, platform: element.platform});
      }
      if (element.type === activityType.SERIE) {
        this.SERIES_DATA.push({name: element.name, platform: element.platform});
      }
      if (element.type === activityType.FOOD) {
        this.FOOD_DATA.push({name: element.name});
      }
      if (element.type === activityType.PLAN) {
        this.PLAN_DATA.push({name: element.name});
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
