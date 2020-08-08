import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBars {
  constructor(private snackBar: MatSnackBar) {
  }

  openInfoSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 6000,
      panelClass: ['green-snackbar']
    });
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 6000,
      panelClass: ['red-snackbar']
    });
  }
}
