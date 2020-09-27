import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {PaymentReason} from '../objects/payment-reason';
import {SnackBars} from './snack.bars';

@Component({
  templateUrl: 'mem-ann-dialog.component.html',
})
export class MemAnnDialogComponent {
  code = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  value = new FormControl('', [Validators.required, Validators.maxLength(200)]);

  constructor(private snackBars: SnackBars,
              public dialogRef: MatDialogRef<MemAnnDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MemAnnDialogData) {
  }

  getErr(fc: FormControl) {
    if (fc.hasError('required')) {
      return 'You must enter a valid value';
    }
    if (fc.hasError('maxLength')) {
      return 'You must enter a valid email';
    }
    return 'any error';
  }

  isInvalid() {
    return this.code.invalid || this.value.invalid;
  }

  add($event: MouseEvent) {
    console.log('resonsList: ' + JSON.stringify(this.data.existingReasons));
    const codeExist = this.data.existingReasons.some(r => r.code === this.code.value);
    console.log('code exist' + codeExist);
    if (codeExist) {
      this.snackBars.openErrorSnackBar('Reason code already exists in system.');
      return;
    }
    const valueExist = this.data.existingReasons.some(r => r.value === this.value.value);
    console.log('code exist' + codeExist);
    if (valueExist) {
      this.snackBars.openErrorSnackBar('Reason value already exists in system.');
      return;
    }
    this.data.code = this.code.value;
    this.data.value = this.value.value;
    this.dialogRef.close(this.data);
  }

  cancel($event: MouseEvent) {
    this.dialogRef.close();
  }
}

export class MemAnnDialogData {
  title: string;
  code: string;
  value: string;
  existingReasons: PaymentReason[];
}
