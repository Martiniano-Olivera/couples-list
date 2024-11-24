import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
movieInput:string = '';
foodInput:string = '';
planInput:string = '';
selectedPlatform = '';
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
    name: 'Ninguna de las anteriores',
    owner: 'Nadie'
  },
]
save(activity:string){
  let title:string = '';
  switch (activity) {
    case 'pelicula':
      if (this.movieInput !== '') {
        title = 'El título';
        const movie = `La película ${this.movieInput} se puede ver por ${this.selectedPlatform}`
        this.saveItem('movie',movie);
        this.movieInput='';
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
    let prueba = window.localStorage.getItem(activity);
    let finalValue = prueba + ', ' + value;
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
    text: `Plan: ${finalSelectedPlan}, \n
    Comida: ${finalSelectedFood}, \n
    Película: ${finalSelectedMovie}`,
    icon: "success"
  });
}

}
