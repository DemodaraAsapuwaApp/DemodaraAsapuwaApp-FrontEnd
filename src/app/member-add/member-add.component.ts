import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MemberService} from '../services/member.service';
import {Member} from '../objects/member';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent {
  startDate = new Date();
  name = new FormControl('', [Validators.required]);
  des = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  tranDate = new FormControl(new Date(), [Validators.required]);
  tpNo = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private memberService: MemberService,
              private snackBar: MatSnackBar) {
  }

  getErr(fc: FormControl) {
    if (fc.hasError('required')) {
      return 'You must enter a valid value';
    }
    if (fc.hasError('pattern')) {
      return 'You must enter a valid number';
    }
    if (fc.hasError('email')) {
      return 'You must enter a valid email';
    }
    return 'any error';
  }

  inValidInput() {
    return this.name.invalid || this.amount.invalid || this.des.invalid || this.tranDate.invalid || this.tpNo.invalid || this.email.invalid;
  }

  save() {
    const member = new Member();
    member.name = this.name.value;
    member.amount = this.amount.value;
    member.description = this.des.value;
    member.transactionDate = this.tranDate.value;
    member.tpNo = this.tpNo.value;
    member.email = this.email.value;

    this.memberService.add(member).subscribe(
      data => {
        this.openSnackBar('User added to system.', 'green-snackbar');
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Error adding user to system. ' + error.error, 'red-snackbar');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
