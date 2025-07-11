import { Routes } from '@angular/router';
import {DashboardComponent} from '../components/dashboard-component/dashboard-component';
import {VehicleAddComponent} from '../components/vehicle-add-component/vehicle-add-component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-vehicle', component: VehicleAddComponent }
];
