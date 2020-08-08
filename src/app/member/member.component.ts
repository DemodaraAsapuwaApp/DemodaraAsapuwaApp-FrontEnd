import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MemberService} from '../services/member.service';
import {Member} from '../objects/member';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-member-add',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member = new Member();
  startDate = new Date();
  name = new FormControl('', [Validators.required]);
  des = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  tranDate = new FormControl(new Date(), [Validators.required]);
  tpNo = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private memberService: MemberService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    const memberId: number = +this.route.snapshot.paramMap.get('id');
    if (memberId === 0) {
      return;
    }
    this.memberService.find(memberId).subscribe(m => {
        this.member = m;
        this.name.setValue(m.name);
        this.des.setValue(m.description);
        this.amount.setValue(m.amount);
        this.tranDate.setValue(m.transactionDate);
        this.tpNo.setValue(m.tpNo);
        this.email.setValue(m.email);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Error loading user from system to mofify. ' + error.error, 'red-snackbar');
      });
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
    this.member.name = this.name.value;
    this.member.amount = this.amount.value;
    this.member.description = this.des.value;
    this.member.transactionDate = this.tranDate.value;
    this.member.tpNo = this.tpNo.value;
    this.member.email = this.email.value;

    if (this.member.id > 0) {
      this.memberService.modify(this.member).subscribe(
        data => {
          this.openSnackBar('User modified.', 'green-snackbar');
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar('Error modifing user in system. ' + error.error, 'red-snackbar');
        });
    } else {
      this.memberService.add(this.member).subscribe(
        data => {
          this.openSnackBar('User added to system.', 'green-snackbar');
          this.memberService.findByName(this.member.name).subscribe((mList: Member[]) => {
            this.router.navigate(['/members/modify', mList[0].id]);
          });
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar('Error adding user to system. ' + error.error, 'red-snackbar');
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
