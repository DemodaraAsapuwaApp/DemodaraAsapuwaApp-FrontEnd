import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from '../../services/member.service';
import {Member} from '../../objects/member';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-member-summary',
  templateUrl: './member-summary.component.html',
  styleUrls: ['./member-summary.component.css']
})
export class MemberSummaryComponent implements OnInit {
  public members: Member[];
  private sub: Subscription;

  constructor(private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.sub = this.memberService.findAll().subscribe(m => {
      this.members = m;
    });
  }

  modify(event: MouseEvent) {
    event.stopPropagation();
  }

  delete(event: MouseEvent) {
    event.stopPropagation();
  }
}
