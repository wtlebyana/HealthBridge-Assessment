import { Injectable } from '@angular/core';
import { Vehicle } from '../model/Vehicle';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private cart: Vehicle[] = [];

  private cartItemsSubject = new BehaviorSubject<Vehicle[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(vehicle: Vehicle): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, vehicle]);
  }

  removeOneFromCart(vehicle: Vehicle): void {
    const currentItems = [...this.cartItemsSubject.value];
    const index = currentItems.findIndex(v => v.id === vehicle.id);
    if (index > -1) {
      currentItems.splice(index, 1);
      this.cartItemsSubject.next(currentItems);
    }
  }

}
