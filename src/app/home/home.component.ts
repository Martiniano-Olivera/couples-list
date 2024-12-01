import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2'
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
        title = 'El título';
        const movie = `La película <b>${this.movieInput}</b> se puede ver por <b>${this.selectedPlatform}</b>`
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
        title = 'El título';
        const serie = `La serie <b>${this.serieInput}</b> se puede ver por <b>${this.selectedSeriesPlatform}</b>`
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
        this.saveItem('food',this.foodInput);
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
        this.saveItem('plan',this.planInput);
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

saveItem(activity:string, value:string){
  if (window.localStorage.getItem(activity) === null){
    window.localStorage.setItem(`${activity}`, value);
  }
  else{
    let storedActivity = window.localStorage.getItem(activity);
    let finalValue = storedActivity + ', ' + value;
    window.localStorage.setItem(`${activity}`, finalValue);
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
