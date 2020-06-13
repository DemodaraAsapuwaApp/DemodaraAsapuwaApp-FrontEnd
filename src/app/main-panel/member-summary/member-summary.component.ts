import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from '../../services/member.service';
import {Member} from '../../objects/member';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-member-summary',
  templateUrl: './member-summary.component.html',
  styleUrls: ['./member-summary.component.css']
})
export class MemberSummaryComponent implements OnInit {
  public members: Member[];

  constructor(private memberService: MemberService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.memberService.findAll().subscribe(m => {
      this.members = m;
    });
  }

  modify(event: MouseEvent) {
    event.stopPropagation();
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.memberService.delete(id.toString()).subscribe(
      r => {
        this.openSnackBar('Member deleted');
        this.memberService.findAll().subscribe(m => {
          this.members = m;
        });
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Error deleting user from system. ' + error.error);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 6000,
    });
  }
}
