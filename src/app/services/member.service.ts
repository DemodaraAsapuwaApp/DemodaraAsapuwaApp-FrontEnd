import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SystemProperty} from '../objects/system-property';
import {Member} from '../objects/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberUrl = `http://localhost:8080/member-management/members`;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl);
  }

  public find(id: number): Observable<Member> {
    const url = this.memberUrl + `/${id}`;
    return this.http.get<Member>(url);
  }

  public findByName(name: string): Observable<Member[]> {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.get<Member[]>(this.memberUrl, {params: params});
  }

  public modify(member: Member): Observable<any> {
    const url = this.memberUrl + `/${member.id}`;
    return this.http.put<SystemProperty>(url, member);
  }

  public add(member: Member): Observable<any> {
    return this.http.post<Member>(this.memberUrl, member);
  }

  public delete(id: string): Observable<any> {
    const url = this.memberUrl + `/${id}`;
    return this.http.delete<Member>(url);
  }
}