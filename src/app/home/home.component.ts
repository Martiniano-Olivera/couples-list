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

// onSubmit(): void {
//   const data = {
//     movie: 'Contenido de prueba 2',
//     series: 'Contenido de prueba 2',
//     food: 'Contenido de prueba 2',
//     plan: 'Contenido de prueba 2'
//   };

//   this.firebaseService.addData(data).subscribe(
//     (res) => {
//       console.log('Datos subidos exitosamente:', res);
//     },
//     (err) => {
//       console.error('Error al subir los datos:', err);
//     }
//   );
// }

save(){

  let data: Activity = {} as Activity;



  // let title:string = '';
  // switch (activity) {
    // case 'película':
      if (this.movieInput !== '' && this.selectedPlatform !== 'Seleccioná en qué plataforma se encuentra') {
        // title = 'La película';
        data.type = 'pelicula'
        data.nombre = this.movieInput;
        data.plataforma = this.selectedPlatform;
        // const movie = `La película <b>${this.movieInput}</b> se puede ver por <b>${this.selectedPlatform}</b>`
        // const movie = new Activity(this.movieInput,this.selectedPlatform);
        // this.saveItem('movie',movie);
        this.movieInput='';
        this.selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
        // this.showSuccessMessage(title); 
      }
      else{
        this.showErrorMessage();
      }
      // break;
    // case 'serie':
      if (this.serieInput !== '' && this.selectedSeriesPlatform !== 'Seleccioná en qué plataforma se encuentra') {
        // title = 'La serie';
        data.type = 'serie'
        data.nombre = this.serieInput;
        data.plataforma = this.selectedSeriesPlatform;
        // const serie = new Activity(this.serieInput,this.selectedSeriesPlatform);
        // this.saveItem('series',serie);
        this.serieInput='';
        this.selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
        //  this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      // break;
    // case 'comida':
      if (this.foodInput !== '') {
        // title = 'La comida';
        data.type = 'comida'
        data.nombre = this.foodInput;
        // const food = new Activity(this.foodInput);
        // this.saveItem('food',food);
        this.foodInput='';
        //  this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      // break;
    // case 'plan':
      if (this.planInput !== '') {
        // title = 'El plan';
        data.type = 'plan';
        data.nombre = this.planInput;
        // const plan = new Activity(this.planInput);
        // this.saveItem('plan',plan);
        this.planInput='';
        //  this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      // break;
    // default:
      // break;
  // }

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

//! Esto podría ser refactorizable tranquilamente. Hay un método "Save" que después llama a este método saveItem.
//! Para lo unico que sirve saveItem es por el tema del id autoincremental que hay en el modelo Activity. 
//! Se podría refactorizar para que el id se genere en el método save y no en el saveItem.
//! Lo ideal sería manejarlo por el lado del backend, pero como no hay backend, se podría hacer en el front.
//! De momento se va a hacer que funcione así, una vez que funcione bien de esta forma se empezará a trabajar sobre su refactorización.
//! Paso a paso dijo mostaza.
//  saveItem(activityName:string, activity:Activity){
//   console.log(activity);
//   const storedActivity = window.localStorage.getItem(activityName);
//   // if (window.localStorage.getItem(activityName) === null){
//     let name:string = '';
//   switch (activityName) {
//     case 'movie':
//       name = `La película <b>${this.movieInput}</b> tiene el identificador ${activity.id} y se puede ver por <b>${this.selectedPlatform}</b>`
      
//       break;
//     case 'series':
//       name = `La serie <b>${this.serieInput}</b> tiene el identificador ${activity.id} y se puede ver por <b>${this.selectedSeriesPlatform}</b>`    
//       break;
//     case 'food':
//       name = `La comida es <b>${this.foodInput}</b> y tiene el identificador ${activity.id}`
//       break;
//     case 'plan':
//     name = `El plan es <b>${this.planInput}</b> y tiene el identificador ${activity.id}`
//       break;
//     default:
//       break;
//   }

//   if (storedActivity === null){
//     // const value = JSON.stringify((activity.name)) + ', ' + JSON.stringify(activity.information) + ', ' + activity.id;
//     // window.localStorage.setItem(activityName, value);
//     window.localStorage.setItem(activityName, name);
//   }
//   else{
//     // const value =  JSON.stringify((activity.name)) + ', ' + JSON.stringify(activity.information);
//     let finalValue = storedActivity + ', ' + name ;
//     window.localStorage.setItem(activityName, finalValue);
//   }
// }

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
