import {Component, OnInit} from '@angular/core';
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
export interface Series {
  seriesName: string;
  platformName: string;
}
export interface Plan {
  plan: string;
  details: string;
}



@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true
})


export class ListComponent implements OnInit {

  MOVIE_DATA: Movie[] = [];
  SERIES_DATA: Series[] = [];
  FOOD_DATA: Food[] = [];
  PLAN_DATA: Plan[] = [];
  displayedColumnsForFood : string[] = ['food', 'details'];
  displayedColumnsForMovies : string[] = ['movie', 'platformName'];
  displayedColumnsForSeries : string[] = ['series', 'platformName'];
  displayedColumnsForPlans : string[] = ['plan', 'details'];
  foodDataSource = new MatTableDataSource(this.FOOD_DATA);
  movieDataSource = new MatTableDataSource(this.MOVIE_DATA);
  seriesDataSource = new MatTableDataSource(this.SERIES_DATA);
  planDataSource = new MatTableDataSource(this.PLAN_DATA);

  constructor(private iMatDialog: MatDialog){}

  ngOnInit() {
    this.loadTableData();
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
    console.log(details)
    this.iMatDialog.open(DetailsComponent,{
      data:{
        title:activity,
        description:name,
        extraInfo:details
      }
    });
  }

  getMovie(){
      let stored = window.localStorage.getItem('movie');
      // Separo lo que hay almacenado en localStorage y le borro el texto La película <b>, quedándome con un array grande, que en cada posición contiene lo siguiente
      // Volver al futuro</b> se puede ver por <b>Amazon Prime</b>," y así por cada película que haya cargado
      let firstPartOfStoredMovies = stored?.split('La película <b>');

      // Vuelvo a separar el resultado y le saco el texto </b> se puede ver por, quedándome con un array grande, que en cada posición contiene un array con dos valores,
      // el nombre de la película, y la plataforma, por ejemplo ['Volver al futuro', ' <b>Amazon Prime</b>, ']
      let secondPartOfStoredMovies = firstPartOfStoredMovies?.map(element => {
          return element.split('</b> se puede ver por');
        })
      //Aca le saco lo último y ya me quedo solo con un array que contiene únicamente el nombre de las películas
      let movie = secondPartOfStoredMovies?.map(element => {
        return (element[0]?.split('<b>'));
      })
      let platform = secondPartOfStoredMovies?.map(element => {
        return (element[1]?.split('<b>')[1]?.split('</b>')[0]);
      })

      movie?.map((element, index) => {
        if(element !== undefined && platform !== undefined && element[0] !== '')
            this.MOVIE_DATA.push({movieName:element[0], platformName: platform[index]})
      })
  }

  getSeries(){
    let stored = window.localStorage.getItem('series');
    // Separo lo que hay almacenado en localStorage y le borro el texto La película <b>, quedándome con un array grande, que en cada posición contiene lo siguiente
    // Volver al futuro</b> se puede ver por <b>Amazon Prime</b>," y así por cada película que haya cargado
    let firstPartOfStoredSeries = stored?.split('La serie <b>');

    // Vuelvo a separar el resultado y le saco el texto </b> se puede ver por, quedándome con un array grande, que en cada posición contiene un array con dos valores,
    // el nombre de la película, y la plataforma, por ejemplo ['Volver al futuro', ' <b>Amazon Prime</b>, ']
    let secondPartOfStoredSeries = firstPartOfStoredSeries?.map(element => {
      return element.split('</b> se puede ver por');
    })
    //Aca le saco lo último y ya me quedo solo con un array que contiene únicamente el nombre de las películas
    let movie = secondPartOfStoredSeries?.map(element => {
      return (element[0]?.split('<b>'));
    })
    let platform = secondPartOfStoredSeries?.map(element => {
      return (element[1]?.split('<b>')[1]?.split('</b>')[0]);
    })

    movie?.map((element, index) => {
      if(element !== undefined && platform !== undefined && element[0] !== '')
        this.SERIES_DATA.push({seriesName:element[0], platformName: platform[index]})
    })
  }

  getFood(){
  // this.upperCaseTitle('prueba');
    let storedFood = window.localStorage.getItem('food')?.split(',');
    storedFood?.map((element) => {
      if(element !== undefined && element !== '') {
      // element = this.upperCaseTitle(element);
      this.FOOD_DATA.push({food:element, details: ''});

      }
    })
  }

  getPlans(){
    let storedPlans = window.localStorage.getItem('plan')?.split(',');
    storedPlans?.map((element) => {
      if(element !== undefined && element !== '') {
        this.PLAN_DATA.push({plan:element, details: ''});

      }
    })
  }

  // upperCaseTitle(title:string){
  //   let arrayOfWords = title.split('');
  //   arrayOfWords = arrayOfWords[0].toUpperCase() + arrayOfWords.slice(1).join('');
  //   // let finalWord  = arrayOfWords + arrayOfWords.slice(1).join('');
  //   console.log(arrayOfWords);
  //   // return finalWord;
  // }

}
