import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  url: string = `${environment.apiUrl}/flights`

  constructor(private http: HttpClient) { }

  getFligthInfo(body: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(this.url,body,{headers}).pipe(
      map((res: any) => {
        let flight = res.flights;
        let weather = res.weather
        return [flight, weather]
      })
    )
  }
}
