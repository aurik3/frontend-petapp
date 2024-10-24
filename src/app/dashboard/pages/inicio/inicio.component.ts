import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
import { PetService } from '../../../auth/services/pet.service';
import { Observable } from 'rxjs';
import e from 'express';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

Pets:any[] = [];
name:string = '';
breed:string = '';
age:number = 0;
weight:number = 0;
constructor() { 
  this.getPets()
}


private PetService = inject( PetService )

getPets(){
  this.PetService.getPets().subscribe(pets => {
    this.Pets = pets;
  });

}
createPet(){
  Swal.fire({
    title: 'Crear Paciente',
    html:
      '<input id="name" type="text" class="swal2-input" placeholder="Nombre">' +
      '<input id="breed" type="text" class="swal2-input" placeholder="raza">' +
      '<input id="age" type="number" class="swal2-input" placeholder="Edad (años)">' +
      '<input id="weight" type="number" class="swal2-input" placeholder="Peso (Kg)">',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    preConfirm: () => {
      const name = Swal.getPopup()?.querySelector<HTMLInputElement>('#name')?.value
      const breed = Swal.getPopup()?.querySelector<HTMLInputElement>('#breed')?.value
      const age = Swal.getPopup()?.querySelector<HTMLInputElement>('#age')?.value
      const weight = Swal.getPopup()?.querySelector<HTMLInputElement>('#weight')?.value
      if (!name || !breed || !age || !weight) {
        Swal.showValidationMessage(`Ningun campo debe ir vacio`)        
      }
      this.name = name || '';
      this.breed = breed || '';
      this.age = Number(age) || 0;
      this.weight = Number(weight) || 0;  
    }     
  }).then((result) => { 
    if (result.isConfirmed) {


      console.log(this.name, this.breed, this.age, this.weight);

      try {
        const petCreated = this.PetService.createPet(this.name, this.breed, this.age,this. weight).subscribe(pet => {
          this.Pets.push(pet);
        })
        if (petCreated) {
          Swal.fire({ 
            icon: 'success',
            title: 'Paciente creado',   
          })  
        }else{
          Swal.fire({ 
            icon: 'error',
            title: 'Error al crear el paciente',   
          })
        }
  
         
      } catch (error) {
        Swal.fire({ 
          icon: 'error',
          title: JSON.stringify(error),   
        }) 
      }


    }}
  )
}

updatePet(id:number){
  const petData = this.Pets.find((pet) => pet.id === id);

  Swal.fire({
    title: 'Actualizar Paciente',
    html:
      `<input id="name" type="text" class="swal2-input" value="${petData.name}" >` +
      `<input id="breed" type="text" class="swal2-input" value="${petData.breed}">` +
      `<input id="age" type="number" class="swal2-input" value="${petData.age}">` +
      `<input id="weight" type="number" class="swal2-input" value="${petData.weight}">`,
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
    preConfirm: () => {
      const name = Swal.getPopup()?.querySelector<HTMLInputElement>('#name')?.value
      const breed = Swal.getPopup()?.querySelector<HTMLInputElement>('#breed')?.value
      const age = Swal.getPopup()?.querySelector<HTMLInputElement>('#age')?.value
      const weight = Swal.getPopup()?.querySelector<HTMLInputElement>('#weight')?.value
      if (!name || !breed || !age || !weight) {
        Swal.showValidationMessage(`Ningun campo debe ir vacio`)        
      }
      this.name = name || '';
      this.breed = breed || '';
      this.age = Number(age) || 0;
      this.weight = Number(weight) || 0;  
    }     
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        const petUpdated = this.PetService.updatePet(id, this.name, this.breed, this.age,this. weight).subscribe(pet => {
         this.getPets();
        })
        if (petUpdated) {
          Swal.fire({ 
            icon: 'success',
            title: 'Paciente actualizado',   
          })  
        }else{
          Swal.fire({ 
            icon: 'error',
            title: 'Error al actualizar el paciente',   
          })  
        }
      } catch (error) {
        Swal.fire({ 
          icon: 'error',
          title: JSON.stringify(error),   
        })  
      }
        }
        }
  )
}

deletePet(id:number){
 const pet = this.Pets.find((pet) => pet.id === id);
 Swal.fire({
  title: 'Eliminar Paciente',
  text: `¿Estas seguro de eliminar el paciente ${pet.name}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText: 'No'
}).then((result) => {
  if (result.isConfirmed) {
    try {
      const petDeleted = this.PetService.deletePet(id).subscribe(pet => {
        this.Pets = this.Pets.filter((pet) => pet.id !== id);
      })
      if (petDeleted) {
        Swal.fire({ 
          icon: 'success',
          title: 'Paciente eliminado',   
        })  
      }else{
        Swal.fire({ 
          icon: 'error',
          title: 'Error al eliminar el paciente',   
        })
      }
    } catch (error) {
      Swal.fire({ 
        icon: 'error',
        title: JSON.stringify(error),   
      }) 
    }
  }
})

}



}

