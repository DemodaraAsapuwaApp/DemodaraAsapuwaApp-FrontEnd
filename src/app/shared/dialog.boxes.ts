import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';
import {Observable, of} from 'rxjs';
import {ConfirmDialogComponent, DialogData} from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxes {
  constructor(public dialog: MatDialog) {
  }

  confirmDialog(dialogData: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }
}
