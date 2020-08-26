import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent, DialogData} from './confirm-dialog.component';
import {takeWhile, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxes {
  constructor(public dialog: MatDialog) {
  }

  confirmDialog(dialogData: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, DialogData, boolean>(ConfirmDialogComponent, {
      width: '250px',
      data: dialogData
    });
    return dialogRef.afterClosed().pipe(
      tap(k => console.log('dialogref value: ' + k)),
      takeWhile(val => val === true)
    );
  }
}
