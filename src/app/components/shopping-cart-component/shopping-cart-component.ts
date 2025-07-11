import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle } from '../../model/Vehicle';
import {ShoppingCartService} from '../../service/ShoppingCartService';
import { MatDialogRef } from '@angular/material/dialog';
import {MatCard, MatCardActions} from '@angular/material/card';
import {Subscription} from 'rxjs';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackbarService} from '../../service/SnackbarService';


@Component({
  selector: 'app-shopping-cart-component',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardActions,
    MatCard,
    MatSnackBarModule
  ],
  templateUrl: './shopping-cart-component.html',
  styleUrls: ['./shopping-cart-component.scss']
})
export class ShoppingCartComponent {
  cartItems: Vehicle[] = [];

  private subscription?: Subscription;

cartItemsGrouped: CartItemWithQuantity[] = [];
  constructor(private cartService: ShoppingCartService,
              private dialogRef: MatDialogRef<ShoppingCartComponent>,
              private snackbarService: SnackbarService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }


  ngOnInit() {
    this.subscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItemsGrouped = this.groupItemsWithQuantity(items);
    });
  }


  groupItemsWithQuantity(items: Vehicle[]): CartItemWithQuantity[] {
    const map = new Map<string, CartItemWithQuantity>();

    items.forEach(item => {
      const id = item.id;
      if (map.has(<string>id)) {
        if (id != null) {
          map.get(id)!.quantity++;
        }
      } else {
        if (id != null) {
          map.set(id, {vehicle: item, quantity: 1});
        }
      }
    });

    return Array.from(map.values());
  }

  removeItem(index: number): void {
    const vehicleToRemove = this.cartItemsGrouped[index].vehicle;
    this.cartService.removeOneFromCart(vehicleToRemove);
    this.snackbarService.openSnackBar('Item removed from cart');
  }


  close(): void {
    this.dialogRef.close();
  }
}

interface CartItemWithQuantity {
  vehicle: Vehicle;
  quantity: number;
}
