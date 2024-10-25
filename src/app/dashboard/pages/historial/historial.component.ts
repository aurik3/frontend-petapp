import { Component, inject } from '@angular/core';
import { ClinicalService } from '../../../auth/services/clinical.service';
import Swal from 'sweetalert2';
import { PetService } from '../../../auth/services/pet.service';
import { map } from 'rxjs';
import e from 'express';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
History:any[]=[];
Pets:any[]=[];

private ClinicalService = inject( ClinicalService )
private PetService = inject( PetService )
constructor() {

  this.getHistorial()
}

getHistorial() {
this.ClinicalService.getHistorial().subscribe((clinical) => {
  this.History = clinical;
})

}


createHistorial() {
  // Primero obtenemos las mascotas y construimos el selector
  const pets = this.PetService.getPets().subscribe(pets => {
    // Construimos las opciones del selector usando los datos de las mascotas
    const petOptions = pets.map((pet:any) => 
      `<option value="${pet.id}">${pet.name}</option>`
    ).join('');

    // Mostramos el SweetAlert2 con las opciones dinámicas
    Swal.fire({
      title: 'Crear Historial',
      html: `
        <select id="clinical" class="swal2-input" placeholder="Paciente">
          <option value="">Seleccione una mascota</option>
          ${petOptions}
        </select>
        <br>
        <br>
        <textarea id="description" class="swal2-input" placeholder="Descripción"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      preConfirm: () => {
        const petId = Swal.getPopup()?.querySelector<HTMLSelectElement>('#clinical')?.value;
        const description = Swal.getPopup()?.querySelector<HTMLTextAreaElement>('#description')?.value;
        
        if (!petId || !description) {
          Swal.showValidationMessage('Por favor complete todos los campos');
          return false;
        }     
        return {
          petId,
          description
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
       
        
          const petId= result.value.petId
          const description= result.value.description

          this.ClinicalService.createHistorial(petId,description).subscribe(
            response => {
             this.getHistorial();
              Swal.fire('¡Éxito!', 'Historial creado correctamente', 'success');
            },
            error => {
              Swal.fire('Error', error, 'error');
            } 
          );
          }     
       
      });
  });
}

updateHistorial(id:number){
  
  const getHistorial = this.History.find((historial) => historial.dataValues.id === id);


  
  Swal.fire({
    title: 'Actualizar Historial',
    html: `
      <input id="id_pet" type="text" class="swal2-input" value="${getHistorial.dataValues.id_pet}" hidden>
      <input id="clinical" type="text" class="swal2-input" value="${getHistorial.pacient}" readonly>
      <input id="description" type="text" class="swal2-input" value="${getHistorial.dataValues.description}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
    preConfirm: () => {
      const petId = Swal.getPopup()?.querySelector<HTMLSelectElement>('#id_pet')?.value;
      const description = Swal.getPopup()?.querySelector<HTMLInputElement>('#description')?.value;
      if (!description) {
        Swal.showValidationMessage('Por favor ingrese una descripción');
        return false;
      }
      return {
        petId,
        description
      };  
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const petId= result.value.petId
      const description= result.value.description
      this.ClinicalService.updateHistorial(id,petId, description).subscribe(
        response => {
          this.getHistorial();
          Swal.fire('¡Éxito!', 'Historial actualizado correctamente', 'success');
        },
        error => {
          Swal.fire('Error', error, 'error');
        }
      );
    }
  })
}
deleteHistorial(id:number){
  this.ClinicalService.deleteHistorial(id).subscribe(
    response => {
      this.getHistorial();
      Swal.fire('¡Éxito!', 'Historial eliminado correctamente', 'success');
    },
    error => {
      Swal.fire('Error', error, 'error');
    }
  );
}
} 