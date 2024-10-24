import { Component, inject } from '@angular/core';
import { ClinicalService } from '../../../auth/services/clinical.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
History:any[]=[];

private ClinicalService = inject( ClinicalService )
constructor() {

  this.getHistorial()
}

getHistorial() {
this.ClinicalService.getHistorial().subscribe((clinical) => {
  console.log(clinical)  
  this.History = clinical;
})

}
}