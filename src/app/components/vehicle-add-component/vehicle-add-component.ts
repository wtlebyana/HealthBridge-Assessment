import { Component } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {FormsModule, NgForm} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {VehicleService} from '../../service/VehicleService';
import {SnackbarService} from '../../service/SnackbarService';

@Component({
  selector: 'app-vehicle-add-component',
  imports: [
    FormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    RouterLink,
  ],
  templateUrl: './vehicle-add-component.html',
  styleUrl: './vehicle-add-component.scss'
})
export class VehicleAddComponent {

  vehicle = {
    make: '',
    model: '',
    body: '',
    price: 0,
    imageUrl: '',
    year:''
  };

  constructor(private firestore: Firestore,
              private vehicleService: VehicleService, private snackbarService: SnackbarService) {}

  async addVehicle(form: NgForm) {
    if (!form.valid) {
      this.snackbarService.openSnackBar('Please fill in all required fields.');
      return;
    }
    try {
      await this.vehicleService.addVehicle(this.vehicle)
      this.snackbarService.openSnackBar('Vehicle added to Firestore Database');
    } catch (error) {
      this.snackbarService.openSnackBar('Error adding vehicle:');
    }
  }


}
