import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ShoppingCartComponent} from '../shopping-cart-component/shopping-cart-component';
import {MatDialog} from '@angular/material/dialog';
import {MatBadge} from '@angular/material/badge';
import {ShoppingCartService} from '../../service/ShoppingCartService';
import {Vehicle} from '../../model/Vehicle';

@Component({
  selector: 'app-navigation-bar-component',
  imports: [
    MatIcon,
    MatToolbar,
    MatIcon,
    MatIcon,
    MatIconButton,
    MatBadge
  ],
  templateUrl: './navigation-bar-component.html',
  styleUrl: './navigation-bar-component.scss'
})
export class NavigationBarComponent {
  cartItems: Vehicle[] = [];

  constructor(private dialog: MatDialog, private cartService: ShoppingCartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  openCartDialog(): void {
    this.dialog.open(ShoppingCartComponent, {
      width: '400px',
    });
  }
}
