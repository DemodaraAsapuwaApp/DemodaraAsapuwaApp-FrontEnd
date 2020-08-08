import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from '../../objects/member';
import {Subscription} from 'rxjs';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-evaluation-panel',
  templateUrl: './evaluation-panel.component.html',
  styleUrls: ['./evaluation-panel.component.css']
})
export class EvaluationPanelComponent implements OnInit, OnDestroy {
  public membersList: Member[];
  private sub: Subscription;
  public allSelected = false;

  constructor(private memberService: MemberService) {
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
}
