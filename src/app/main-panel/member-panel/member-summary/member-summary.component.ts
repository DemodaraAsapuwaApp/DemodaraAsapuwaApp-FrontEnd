import {Component, OnInit} from '@angular/core';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../objects/member';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBars} from '../../../shared/snack.bars';
import {Router} from '@angular/router';
import {DialogBoxes} from '../../../shared/dialog.boxes';

@Component({
  selector: 'app-member-summary',
  templateUrl: './member-summary.component.html',
  styleUrls: ['./member-summary.component.css']
})
export class MemberSummaryComponent implements OnInit {
  public members: Member[];

  constructor(private memberService: MemberService,
              private snackBars: SnackBars,
              private router: Router,
              private dialogBoxes: DialogBoxes) {
  }

  ngOnInit(): void {
    this.memberService.findAll().subscribe(m => {
      this.members = m;
    });
  }

  modify(event: MouseEvent, name: string) {
    event.stopPropagation();
    this.memberService.findByName(name).subscribe((mList: Member[]) => {
        this.router.navigate(['/members/modify', mList[0].id]);
      },
      (error: HttpErrorResponse) => {
        this.snackBars.openErrorSnackBar('Error navigating to add-modify-member modification. ' + error.message);
      });
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.dialogBoxes.confirmDialog({title: 'Delete Member', contentText: 'Do you want to delete the member from system ?'})
      .subscribe((ans: boolean) => {
        if (ans) {
          this.memberService.delete(id.toString()).subscribe(
            r => {
              this.snackBars.openErrorSnackBar('Member deleted.');
              this.memberService.findAll().subscribe(m => {
                this.members = m;
              });
            },
            (error: HttpErrorResponse) => {
              this.snackBars.openErrorSnackBar('Error deleting add-modify-member from system. ' + error.message);
            });
        }
      });
  }
}