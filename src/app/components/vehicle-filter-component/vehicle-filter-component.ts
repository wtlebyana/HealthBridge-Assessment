import { Component, Output, EventEmitter } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {NgForOf} from '@angular/common';
import {VehicleService} from '../../service/VehicleService';
import {Vehicle} from '../../model/Vehicle';

@Component({
  selector: 'app-vehicle-filter-component',
  standalone: true,
  templateUrl: './vehicle-filter-component.html',
  imports: [
    MatFormField,
    MatFormField,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatFormField,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    MatSelect,
    MatOption,
    NgForOf
  ],
  styleUrls: ['./vehicle-filter-component.scss'] // <-- Fixed key
})
export class VehicleFilterComponent {

  @Output() manufacturerFilter = new EventEmitter<string>();
  @Output() bodyFilter = new EventEmitter<string>();
  @Output() priceFilter = new EventEmitter<{ min: number; max: number }>();

  selectedMake = '';
  selectedBody = '';
  selectedPrice = '';



  minPrice: number = 0;
  maxPrice: number = 10000000;

  makes: string[] = [];
  bodies : (string | undefined)[] = [];
  prices: (number | string)[] = [];


  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      const allMakes = vehicles.map(v => v.make);
      const bodyTypes = vehicles.map(v => v.body);
      const prices = vehicles.map(v => v.price);
      this.makes = Array.from(new Set(allMakes)).sort();
      this.bodies = Array.from(new Set(bodyTypes)).sort();
      this.prices =Array.from(new Set(prices)).sort();
    });
  }

  onMakeChange(value: string) {
    this.manufacturerFilter.emit(value);
  }

  onBodyChange(value: string) {
    this.bodyFilter.emit(value);
  }

  onPriceChange() {
    this.priceFilter.emit({ min: this.minPrice || 0, max: this.maxPrice || 10000000 });
  }

}
