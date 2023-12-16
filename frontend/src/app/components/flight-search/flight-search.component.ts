import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';
import { firstValueFrom } from 'rxjs';
import { flights, forecast } from '../../models/fligths';
import { FligthTableComponent } from './fligth-table/fligth-table.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule,FligthTableComponent,ForecastCardComponent,DatePipe],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {

  flightForm!: FormGroup
  fligths: flights[] = [];
  errorAlert: boolean = false;
  weather: forecast[] = [];
  today = new Date()
  destination: string = '';
  loading: boolean = false;
  origin: string = '';
  errorMessage: string = '';


  constructor(private fb: FormBuilder,private fligthService: FlightsService){
  }

  ngOnInit(): void {
    this.flightForm = this.setFlightForm();
  }

  setFlightForm(){
    return this.fb.group({
      origin: ['',Validators.required],
      destination: ['',Validators.required],
      date: ['',[Validators.required]]
    })
  }

  async searchFlights(){
    let body = this.flightForm.value
    this.loading = true;
    this.fligths = [];
    this.weather = [];
    this.destination = this.flightForm.get('destination')?.value
    this.origin = this.flightForm.get('origin')?.value
    try{
      let [flight, weather] = await firstValueFrom(this.fligthService.getFligthInfo(body))
      flight.forEach((element:any) => {
        let el = new flights(element);
        this.fligths.push(el)
      });
      weather['forecast']['forecastday'].forEach((element:any) => {
        let el = new forecast(element)
        this.weather.push(el)
      })
      this.flightForm.reset();
      if(this.errorMessage) this.errorAlert = false;
    }catch(e:any){
      this.errorAlert =true
      if (e.status == 404){
        this.errorMessage = `No se encontraro resultados de ${this.origin} a ${this.destination} para la fecha seleccionada`
      }else{
        this.errorMessage = 'Hubo un error intenta de nuevo'
      }
    }finally{
      this.loading = false;
    }
  }

}
