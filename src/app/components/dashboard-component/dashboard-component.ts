import { Component } from '@angular/core';
import {VehicleListComponent} from '../vehicle-list-component/vehicle-list-component';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    VehicleListComponent,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss'
})
export class DashboardComponent {

}
