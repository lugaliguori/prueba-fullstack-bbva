import { Component, Input } from '@angular/core';
import { forecast } from '../../../models/fligths';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css'
})
export class ForecastCardComponent {

  @Input() weather!: forecast[];

  constructor(){

  }

}
