import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: 'gen-confrm-dialog.component.html',
})
export class GenConfrmDialogComponent {
  constructor(public dialogRef: MatDialogRef<GenConfrmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GenConfrmDialogData) {
  }

  cancel($event: MouseEvent) {
    this.dialogRef.close();
  }
}

export class GenConfrmDialogData {
  title: string;
  download = false;
  sendToMember = true;
  sendToSystem = false;
  issueDate = new Date();
}
