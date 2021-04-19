import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent, DialogData} from './confirm-dialog.component';
import {takeWhile, tap} from 'rxjs/operators';
import {AddReasonDialogComponent, AddReasonDialogData} from './add-reason-dialog.component';
import {PaymentReason} from '../objects/payment-reason';
import {GenConfrmDialogComponent, GenConfrmDialogData} from './gen-confrm-dialog.component';

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

  addReasonDialog(title: string, paymentReasons: PaymentReason[]): Observable<AddReasonDialogData> {
    const dialogData = new AddReasonDialogData();
    dialogData.title = title;
    dialogData.existingReasons = paymentReasons;
    const dialogRef = this.dialog.open<AddReasonDialogComponent, AddReasonDialogData, AddReasonDialogData>(AddReasonDialogComponent, {
      width: '400px',
      data: dialogData
    });
    return dialogRef.afterClosed().pipe(
      tap(k => console.log('dialogref value: ' + JSON.stringify(k))),
      takeWhile(val => (typeof val !== 'undefined') &&
        (typeof val.code !== 'undefined') && val.code.trim().length !== 0)
    );
  }

  genConfrmDocDialog(title: string): Observable<GenConfrmDialogData> {
    const dialogData = new GenConfrmDialogData();
    dialogData.title = title;
    const dialogRef = this.dialog.open<GenConfrmDialogComponent, GenConfrmDialogData, GenConfrmDialogData>(GenConfrmDialogComponent, {
      data: dialogData
    });
    return dialogRef.afterClosed().pipe(
      tap(k => console.log('dialogref value: ' + k)),
      takeWhile(val => typeof val !== 'undefined')
    );
  }
}
