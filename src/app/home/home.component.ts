import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2'
import {Activity} from "../shared/classes/activity";
@Component({
  selector: 'app-home',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
movieInput:string = '';
foodInput:string = '';
planInput:string = '';
serieInput: string  = '';
selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
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

constructor(private iMatDialog: MatDialog){}

save(activity:string){
  let title:string = '';
  switch (activity) {
    case 'película':
      if (this.movieInput !== '' && this.selectedPlatform !== 'Seleccioná en qué plataforma se encuentra') {
        title = 'La película';
        // const movie = `La película <b>${this.movieInput}</b> se puede ver por <b>${this.selectedPlatform}</b>`
        const movie = new Activity(this.movieInput,this.selectedPlatform);
        this.saveItem('movie',movie);
        this.movieInput='';
        this.selectedPlatform = 'Seleccioná en qué plataforma se encuentra';
        this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      break;
    case 'serie':
      if (this.serieInput !== '' && this.selectedSeriesPlatform !== 'Seleccioná en qué plataforma se encuentra') {
        title = 'La serie';
        const serie = new Activity(this.serieInput,this.selectedSeriesPlatform);
        this.saveItem('series',serie);
        this.serieInput='';
        this.selectedSeriesPlatform = 'Seleccioná en qué plataforma se encuentra';
        this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      break;
    case 'comida':
      if (this.foodInput !== '') {
        title = 'La comida';
        const food = new Activity(this.foodInput);
        this.saveItem('food',food);
        this.foodInput='';
        this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      break;
    case 'plan':
      if (this.planInput !== '') {
        title = 'El plan';
        const plan = new Activity(this.planInput);
        this.saveItem('plan',plan);
        this.planInput='';
        this.showSuccessMessage(title);
      }
      else{
        this.showErrorMessage();
      }
      break;
    default:
      break;
  }

}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

showErrorMessage(){
  Swal.fire({
    icon: "error",
    title: `No puede haber ningun campo vacío`,
    showConfirmButton: false,
    timer: 1500
  });
}
showSuccessMessage(title:string){
  Swal.fire({
    icon: "success",
    title: `${title} se guardó correctamente.`,
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
 saveItem(activityName:string, activity:Activity){
  console.log(activity);
  const storedActivity = window.localStorage.getItem(activityName);
  // if (window.localStorage.getItem(activityName) === null){
    let name:string = '';
  switch (activityName) {
    case 'movie':
      name = `La película <b>${this.movieInput}</b> tiene el identificador ${activity.id} y se puede ver por <b>${this.selectedPlatform}</b>`
      
      break;
    case 'series':
      name = `La serie <b>${this.serieInput}</b> tiene el identificador ${activity.id} y se puede ver por <b>${this.selectedSeriesPlatform}</b>`    
      break;
    case 'food':
      name = `La comida es <b>${this.foodInput}</b> y tiene el identificador ${activity.id}`
      break;
    case 'plan':
    name = `El plan es <b>${this.planInput}</b> y tiene el identificador ${activity.id}`
      break;
    default:
      break;
  }

  if (storedActivity === null){
    // const value = JSON.stringify((activity.name)) + ', ' + JSON.stringify(activity.information) + ', ' + activity.id;
    // window.localStorage.setItem(activityName, value);
    window.localStorage.setItem(activityName, name);
  }
  else{
    // const value =  JSON.stringify((activity.name)) + ', ' + JSON.stringify(activity.information);
    let finalValue = storedActivity + ', ' + name ;
    window.localStorage.setItem(activityName, finalValue);
  }
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
