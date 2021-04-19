import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../objects/member';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBars} from '../../../shared/snack.bars';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {DialogBoxes} from '../../../shared/dialog.boxes';
import {FileService} from '../../../services/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-member-add',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member = new Member();
  preferredName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  membershipId = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  fullName = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  nicNo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  amount = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  des = new FormControl('', [Validators.required]);
  tranDate = new FormControl(new Date(), [Validators.required]);
  dob = new FormControl(new Date(), [Validators.required]);
  membershipDate = new FormControl(new Date(), [Validators.required]);
  tpNo = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  unitNo = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  street = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  town = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  country = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(private memberService: MemberService,
              private fileService: FileService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBars: SnackBars,
              private dialogBoxes: DialogBoxes) {
  }

  ngOnInit(): void {
    const memberId: number = +this.route.snapshot.paramMap.get('id');
    if (memberId === 0) {
      return;
    }
    this.memberService.find(memberId).subscribe(m => {
        this.member = m;
        this.preferredName.setValue(m.preferredName);
        this.membershipId.setValue(m.membershipId);
        this.fullName.setValue(m.fullName);
        this.nicNo.setValue(m.nicNo);
        this.amount.setValue(m.amount);
        this.des.setValue(m.description);
        this.tranDate.setValue(new Date(m.transactionDate));
        this.dob.setValue(new Date(m.dob));
        this.membershipDate.setValue(new Date(m.membershipDate));
        this.tpNo.setValue(m.tpNo);
        this.email.setValue(m.email);
        this.unitNo.setValue(m.address.unitNo);
        this.street.setValue(m.address.street);
        this.town.setValue(m.address.town);
        this.country.setValue(m.address.country);
      },
      (error: HttpErrorResponse) => {
        this.snackBars.openErrorSnackBar('Error loading member from system to modify. ' + error.error);
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
    if (fc.hasError('maxLength')) {
      return 'You must enter a valid email';
    }
    return 'any error';
  }

  inValidInput() {
    return this.preferredName.invalid || this.membershipId.invalid || this.fullName.invalid || this.nicNo.invalid || this.amount.invalid
      || this.des.invalid || this.tranDate.invalid || this.dob.invalid || this.membershipDate.invalid || this.tpNo.invalid
      || this.email.invalid || this.unitNo.invalid || this.street.invalid || this.town.invalid || this.country.invalid;
  }

  save() {
    this.member.preferredName = this.preferredName.value;
    this.member.membershipId = this.membershipId.value;
    this.member.fullName = this.fullName.value;
    this.member.nicNo = this.nicNo.value;
    this.member.amount = this.amount.value;
    this.member.description = this.des.value;
    this.member.transactionDate = this.tranDate.value;
    this.member.dob = this.dob.value;
    this.member.membershipDate = this.membershipDate.value;
    this.member.tpNo = this.tpNo.value;
    this.member.email = this.email.value;
    this.member.address.unitNo = this.unitNo.value;
    this.member.address.street = this.street.value;
    this.member.address.town = this.town.value;
    this.member.address.country = this.country.value;

    if (this.member.id > 0) {
      this.memberService.modify(this.member).subscribe(
        id => {
          this.snackBars.openInfoSnackBar('Member modified.');
        },
        (error: HttpErrorResponse) => {
          this.snackBars.openErrorSnackBar('Error modifying member in system. ' + error.error);
        });
    } else {
      this.memberService.add(this.member).subscribe(
        id => {
          this.snackBars.openInfoSnackBar('Member added to system. ');
          this.router.navigate(['/members/modify', id]);
        },
        (error: HttpErrorResponse) => {
          this.snackBars.openErrorSnackBar('Error adding member to system. ' + error.error);
        });
    }
  }

  navigateToSummary() {
    this.router.navigate(['/members/summary']);
  }

  generateDoc() {
    this.dialogBoxes.genConfrmDocDialog('Generate Membership Confirmation')
      .pipe(
        tap(ans => console.log('membership doc answer: ' + JSON.stringify(ans))),
        // mergeMap(ans => this.fileService.genConfirmDoc(this.member.id, ans.download,
        //   ans.sendToMember, ans.sendToSystem, ans.issueDate.toString())),
        mergeMap(ans => this.fileService.genConfirmDoc(this.member.id, 'membershipAnnouncement_' + this.member.preferredName + '.docx',
          ans.download, ans.sendToMember, ans.sendToSystem, ans.issueDate)),
        catchError(err => {
            console.log('Error creating membership confirmation document.' + JSON.stringify(err));
            this.snackBars.openErrorSnackBar('Error creating membership confirmation document. ' + JSON.stringify(err));
            return EMPTY;
          }
        )
      ).subscribe(blob => {
        console.log(JSON.stringify(blob));
        saveAs(blob, 'membershipAnnouncement_' + this.member.preferredName + '.docx');
        this.snackBars.openInfoSnackBar('Document Generated');
      }
    );
  }
}
