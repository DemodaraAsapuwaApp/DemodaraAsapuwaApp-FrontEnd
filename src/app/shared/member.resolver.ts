import {Injectable} from '@angular/core';
import {MemberService} from '../services/member.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Member} from '../objects/member';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MemberResolver implements Resolve<Member[]> {
  constructor(private memberService: MemberService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member[]> | Promise<Member[]> | Member[] {
    return this.memberService.findAll();
  }

}
