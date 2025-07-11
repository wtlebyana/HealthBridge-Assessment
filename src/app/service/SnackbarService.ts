import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    panelClass: ['snackbar-success'],
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Close', config?: Partial<MatSnackBarConfig>) {
    const mergedConfig = { ...this.defaultConfig, ...config };
    this.snackBar.open(message, action, mergedConfig);
  }
}
