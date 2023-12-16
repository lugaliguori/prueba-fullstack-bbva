import { Routes } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';

export const routes: Routes = [
    {
        path: '',
        component: FlightSearchComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
