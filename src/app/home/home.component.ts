import Swal from 'sweetalert2'
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Activity} from "../shared/classes/activity";
import { ListComponent } from '../list/list.component';
import { FirebaseService } from '../services/firebase.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent{
foodInput:string = '';
planInput:string = '';
movieInput:string = '';
serieInput: string  = '';
DEFAULT_PLATFORM_TEXT = 'Seleccioná en qué plataforma se encuentra';
selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
user: any;
canSearch: boolean = false;
isDropdownOpen = false;
streamingServices=[
  {
    name: 'Netflix',
    owner: 'Martiniano'
  },
  {
    name: 'Disney +',
    owner: 'Martiniano'
  },
  {
    name: 'Amazon Prime',
    owner: 'Camila'
  },
  {
    name: 'HBO',
    owner: 'Nadie'
  },
  {
    name: 'Mercado play',
    owner: 'Martiniano'
  },
  {
    name: 'Ninguna de las anteriores',
    owner: 'Nadie'
  },
]


constructor(private iMatDialog: MatDialog, private firebaseService: FirebaseService){}

  resetMovieInputs() {
    this.movieInput = '';
    this.selectedPlatform = this.DEFAULT_PLATFORM_TEXT;
  }

  resetSeriesInputs() {
    this.serieInput = '';
    this.selectedSeriesPlatform = this.DEFAULT_PLATFORM_TEXT;
  }

  ngDoCheck(): void {
    if (this.movieInput.trim() !== '' || this.serieInput.trim() !== '' || this.foodInput.trim() !== '' || this.planInput.trim() !== '') {
      this.canSearch = true;
    }
    if (this.movieInput.trim() === '' && this.serieInput.trim() === '' && this.foodInput.trim() === '' && this.planInput.trim() === '') {
      this.canSearch = false;
    }
  }

buildData() {
  const newData: Activity[] = [];

  if (this.movieInput && this.selectedPlatform !== this.DEFAULT_PLATFORM_TEXT) {
    newData.push({ type: 'pelicula', nombre: this.movieInput, plataforma: this.selectedPlatform });
    this.resetMovieInputs();
  }

  if (this.serieInput && this.selectedSeriesPlatform !== this.DEFAULT_PLATFORM_TEXT) {
    newData.push({ type: 'serie', nombre: this.serieInput, plataforma: this.selectedSeriesPlatform });
    this.resetSeriesInputs();
  }

  if (this.foodInput) {
    newData.push({ type: 'comida', nombre: this.foodInput });
    this.foodInput = '';
  }

  if (this.planInput) {
    newData.push({ type: 'plan', nombre: this.planInput });
    this.planInput = '';
  }

  return newData;
}

save() {
  let activities = this.buildData();

  this.firebaseService.saveData(activities).subscribe(
    (response) => {
      this.showSuccessMessage();
    },
    (error) => {
      this.showErrorMessage(error);
    }
  );
}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

showErrorMessage( error:string){
  Swal.fire({
    icon: "error",
    title: `Error al subir los datos. ${error}`,
    showConfirmButton: false,
    timer: 1500
  });
}
showSuccessMessage(){
  Swal.fire({
    icon: "success",
    title: `Datos guardados correctamente.`,
    showConfirmButton: false,
    timer: 1500
  });
}

chooseRandom(){
  const planStored = window.localStorage.getItem('plan');
  const foodStored = window.localStorage.getItem('food');
  const movieStored = window.localStorage.getItem('movie');
  let planArray = planStored?.split(',');
  let foodArray = foodStored?.split(',');
  let movieArray = movieStored?.split(',');
  let planRandomPosition = planArray?.length !== undefined? Math.floor(Math.random()*planArray?.length) : 0;
  let foodRandomPosition = foodArray?.length !== undefined? Math.floor(Math.random()*foodArray?.length) : 0;
  let movieRandomPosition = movieArray?.length !== undefined? Math.floor(Math.random()*movieArray?.length) : 0;

  let finalSelectedPlan = planArray !== undefined ? planArray[planRandomPosition] : 0;
  let finalSelectedFood = foodArray !== undefined ? foodArray[foodRandomPosition]: 0;
  let finalSelectedMovie = movieArray !== undefined ? movieArray[movieRandomPosition]: 0;

  Swal.fire({
    title: "Cosas para hacer",
    html: `<b>Plan:</b> ${finalSelectedPlan} <br> <b>Comida:</b> ${finalSelectedFood} <br> <b>Película:</b> ${finalSelectedMovie}`,
    icon: "success"
  });
}

viewList(){
  this.iMatDialog.open(ListComponent,{
    width: '80%',
    maxHeight: '90vh',
    autoFocus: false,
  });
}

}
