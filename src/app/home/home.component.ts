import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit{
movieInput:string = '';
foodInput:string = '';
planInput:string = '';
serieInput: string  = '';
selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
isDropdownOpen = false;
user: any;
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

ngOnInit(): void {

}



save(){
  let data: Activity = {} as Activity;

  if (this.movieInput !== '' && this.selectedPlatform !== 'Seleccioná en qué plataforma se encuentra') {
    data.type = 'pelicula'
    data.nombre = this.movieInput;
    data.plataforma = this.selectedPlatform;
    this.movieInput='';
    this.selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
  }
  if (this.serieInput !== '' && this.selectedSeriesPlatform !== 'Seleccioná en qué plataforma se encuentra') {
    data.type = 'serie'
    data.nombre = this.serieInput;
    data.plataforma = this.selectedSeriesPlatform;
    this.serieInput='';
    this.selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
  }
  if (this.foodInput !== '') {
    data.type = 'comida'
    data.nombre = this.foodInput;
    this.foodInput='';
  }
  if (this.planInput !== '') {
    data.type = 'plan';
    data.nombre = this.planInput;
    this.planInput='';
  }

  this.firebaseService.addData(data).subscribe({
    next: (res) => {
      console.log('Datos subidos exitosamente:', res);
      this.showSuccessMessage();
    },
    error: (err) => {
      console.error('Error al subir los datos:', err);
      this.showErrorMessage();
    }
  });
}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

showErrorMessage(){
  Swal.fire({
    icon: "error",
    title: `Error al subir los datos.`,
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
