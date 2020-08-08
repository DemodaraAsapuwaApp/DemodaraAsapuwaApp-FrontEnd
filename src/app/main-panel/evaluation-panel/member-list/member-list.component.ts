import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../objects/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  @Input() members: Member[];

  constructor() { }

  updateSelected(event: MouseEvent) {
    event.stopPropagation();
  }
}
