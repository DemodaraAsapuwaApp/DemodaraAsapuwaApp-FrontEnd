import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SystemProperty} from '../objects/system-property';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemPropertyService {
  public MASTER_EMAIL = 'MASTER_EMAIL';
  public CC_EMAILS = 'CC_EMAILS';
  public MID_EVAL_EXP_DATE = 'MID_EVAL_EXP_DATE';
  public END_EVAL_EXP_DATE = 'END_EVAL_EXP_DATE';
  public TRANS_DATE_TOLERANCE = 'TRANS_DATE_TOLERANCE';

  private systemPropertyUrl = 'http://localhost:8080/setting-property-management/settings';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<SystemProperty[]> {
    return this.http.get<SystemProperty[]>(this.systemPropertyUrl);
  }

  public save(properties: SystemProperty[]) {
    return this.http.post<SystemProperty>(this.systemPropertyUrl, properties);
  }

}
