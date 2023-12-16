import { Component, Input } from '@angular/core';
import { flights } from '../../../models/fligths';

@Component({
  selector: 'app-fligth-table',
  standalone: true,
  imports: [],
  templateUrl: './fligth-table.component.html',
  styleUrl: './fligth-table.component.css'
})
export class FligthTableComponent {

  @Input() flights!:  flights[];
  tableHeaders = ['Aerolínea','Punto de salida','Punto de llegada','precio']

  constructor(){

  }

}
