import {Component} from '@angular/core';
import {MemberService} from '../../../services/member.service';
import {Member} from '../../../objects/member';
import {SnackBars} from '../../../shared/snack.bars';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogBoxes} from '../../../shared/dialog.boxes';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-member-summary',
  templateUrl: './member-summary.component.html',
  styleUrls: ['./member-summary.component.css']
})
export class MemberSummaryComponent {
  members$: Observable<Member[]>;
  membersChange$ = new BehaviorSubject<boolean>(true);

  constructor(private memberService: MemberService,
              private activatedRoute: ActivatedRoute,
              private snackBars: SnackBars,
              private router: Router,
              private dialogBoxes: DialogBoxes) {
    this.members$ = this.membersChange$.asObservable().pipe(
      switchMap(change => this.memberService.findAll()),
      catchError(err => {
          this.snackBars.openErrorSnackBar('Error deleting add-modify-member from system. ' + err.message);
          return EMPTY;
        }
      )
    );
  }

  modify(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.router.navigate(['/members/modify', id]);
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.dialogBoxes.confirmDialog({title: 'Delete Member', contentText: 'Do you want to delete the member from system ?'})
      .pipe(
        tap(ans => console.log('confirmation answer: ' + ans)),
        mergeMap(confirmed => this.memberService.delete(id)),
        catchError(err => {
            this.snackBars.openErrorSnackBar('Error deleting add-modify-member from system. ' + err.message);
            return EMPTY;
          }
        )
      ).subscribe(deleteConfirmed => {
        this.snackBars.openErrorSnackBar('Member deleted.');
        this.membersChange$.next(true);
      }
    );
  }
}
