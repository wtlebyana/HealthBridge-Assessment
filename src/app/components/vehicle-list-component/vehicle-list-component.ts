import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {BehaviorSubject, combineLatest, map, Observable, Subscription} from 'rxjs';
import { Vehicle } from '../../model/Vehicle';
import { VehicleService } from '../../service/VehicleService';
import { VehicleFilterComponent } from '../vehicle-filter-component/vehicle-filter-component';
import {ShoppingCartService} from '../../service/ShoppingCartService';
import { SnackbarService } from '../../service/SnackbarService'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-vehicle-list-component',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    VehicleFilterComponent,
    RouterLink
  ],
  templateUrl: './vehicle-list-component.html',
  styleUrls: ['./vehicle-list-component.scss']
})
export class VehicleListComponent {
  vehicles$: Observable<Vehicle[]>;
  private subscription?: Subscription;
  cartItems: Vehicle[] = [];
  private selectedMake$ = new BehaviorSubject<string>('');
  private selectedBody$ = new BehaviorSubject<string>('');
  private priceRange$ = new BehaviorSubject<{ min: number; max: number }>({ min: 0, max: 10000000 });

  constructor(private vehicleService: VehicleService,
              private cartService: ShoppingCartService,
              private snackbarService: SnackbarService) {
    this.vehicles$ = this.vehicleService.getVehicles();
  }

  ngOnInit() {
    this.subscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    const allVehicles$ = this.vehicleService.getVehicles();

    this.vehicles$ = combineLatest([
      allVehicles$,
      this.selectedMake$,
      this.selectedBody$,
      this.priceRange$
    ]).pipe(
      map(([vehicles, make, body, price]) =>
        vehicles.filter(vehicle =>
          (!make || vehicle.make === make) &&
          (!body || vehicle.body === body)
        )
      )
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  addToCart(vehicle: Vehicle): void {
    // Optionally check if vehicle already in cart before adding
    if (!this.cartItems.some(v => v.id === vehicle.id)) {
      this.cartService.addToCart(vehicle);
      this.snackbarService.openSnackBar('Vehicle added to Cart');
    } else {
      this.snackbarService.openSnackBar('Vehicle Already Added');
    }
  }


  onMakeFilter(make: string) {
    this.selectedMake$.next(make);
  }

  onBodyFilter(body: string) {
    this.selectedBody$.next(body);
  }

  onPriceFilter(priceRange: { min: number; max: number }) {
    this.priceRange$.next(priceRange);
  }

}
