import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../objects/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberUrl = `http://localhost:8080/member-management/members`;
  public EMPTY_MEMBER: Member;

  constructor(private http: HttpClient) {
    this.EMPTY_MEMBER = new Member();
    this.EMPTY_MEMBER.id = 0;
    this.EMPTY_MEMBER.name = 'NONE';
  }

  public findAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl);
  }

  public find(id: number): Observable<Member> {
    const url = this.memberUrl + `/${id}`;
    return this.http.get<Member>(url);
  }

  public modify(member: Member): Observable<number> {
    const url = this.memberUrl + `/${member.id}`;
    return this.http.put<number>(url, member);
  }

  public add(member: Member): Observable<number> {
    return this.http.post<number>(this.memberUrl, member);
  }

  public delete(id: number): Observable<void> {
    const url = this.memberUrl + `/${id}`;
    return this.http.delete<void>(url);
  }
}
