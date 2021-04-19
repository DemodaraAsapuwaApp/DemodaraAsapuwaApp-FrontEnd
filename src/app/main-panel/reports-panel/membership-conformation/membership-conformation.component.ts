import {Component, OnInit} from '@angular/core';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {Member} from '../../../objects/member';
import {SnackBars} from '../../../shared/snack.bars';
import {MemberService} from '../../../services/member.service';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '../../../services/file.service';
import {MatSelectChange} from '@angular/material/select';
import {FormControl, Validators} from '@angular/forms';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-membership-conformation',
  templateUrl: './membership-conformation.component.html',
  styleUrls: ['./membership-conformation.component.css']
})
export class MembershipConformationComponent implements OnInit {
  members: Member[];
  memberId: number;
  docName = new FormControl('', [Validators.maxLength(50)]);
  issueDate = new FormControl(new Date());
  sendEmailToMember = true;
  downloadDocCopy = true;
  sendEmailToMasterEmail = true;
  isMemEmailResReceived = false;
  isDocCopyResReceived = false;
  isDocCopyResSuccess = false;
  isMasEmailResReceived = false;
  isExecutionCommandIssued = false;

  constructor(private snackBars: SnackBars,
              private route: ActivatedRoute,
              private memberService: MemberService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.memberService.findAll().pipe(
      catchError(err => {
          this.snackBars.openErrorSnackBar('Error fetching members from system. ' + err.error);
          return EMPTY;
        }
      )
    ).subscribe(members => {
      this.members = members;
      const memberId: number = +this.route.snapshot.paramMap.get('id');
      if (memberId !== undefined && memberId > 0) {
        this.memberId = memberId;
        this.docName.setValue(this.generateFileName(memberId));
      }
    });
  }

  execute() {
    const docName = this.docName.value;
    this.isExecutionCommandIssued = true;
    this.isDocCopyResReceived = false;
    this.isMemEmailResReceived = false;
    this.isMasEmailResReceived = false;

    this.fileService.genConfirmDoc(this.memberId, this.docName.value, this.issueDate.value).pipe(
      tap(m => this.isDocCopyResReceived = true),
      catchError(err => {
        this.isDocCopyResReceived = true;
        console.log('Error creating membership confirmation document.' + JSON.stringify(err));
        this.snackBars.openErrorSnackBar('Error creating membership confirmation document. ' + JSON.stringify(err));
        this.isDocCopyResSuccess = false;
        return null;
      }),
      filter(val => val !== undefined && val !== null)).subscribe(blob => {
      this.isDocCopyResSuccess = true;
      saveAs(blob, this.docName.value + '.docx');
    });
  }

  modifyFileName($event: MatSelectChange) {
    const value = $event.value;
    console.log(JSON.stringify(value));
    this.docName.setValue(this.generateFileName(value));
  }

  generateFileName(memberId: number): string {
    const member = this.members.find(m => m.id === memberId);
    return member ? 'membership_confirmation_' + member.preferredName : '';
  }
}
