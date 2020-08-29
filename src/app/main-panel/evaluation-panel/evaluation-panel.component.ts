import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from '../../objects/member';
import {Subscription} from 'rxjs';
import {MemberService} from '../../services/member.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-evaluation-panel',
  templateUrl: './evaluation-panel.component.html',
  styleUrls: ['./evaluation-panel.component.css']
})
export class EvaluationPanelComponent implements OnInit, OnDestroy {
  public membersList: Member[];
  private sub: Subscription;
  allSelected = false;
  bankRecordUnAvailable = true;

  constructor(private memberService: MemberService, private fileService: FileService) {
    fileService.bankRecordSubject$.subscribe(records => {
      this.bankRecordUnAvailable = records === undefined || records.length < 1;
    });
  }

  ngOnInit(): void {
    this.memberService.findAll().subscribe((m: Member[]) => {
      this.membersList = m;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  selectAllMembers() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.membersList.forEach(m => m.isSelected = true);
    } else {
      this.membersList.forEach(m => m.isSelected = false);
    }
  }

  membersSelected() {
    return this.membersList === undefined ||
      (this.membersList.filter(m => m.isSelected).length === 0);
  }

  fileUplodaNxst() {
    this.fileService.fileUploadSubject$.next(true);
  }

  selectMemNext() {
    const selectedMambers = this.membersList.filter(m => m.isSelected);
    this.fileService.markedMemberSubject$.next(selectedMambers);
  }
}
