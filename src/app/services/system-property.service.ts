import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SystemProperty} from '../objects/system-property';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemPropertyService {
  private systemPropertyUrl = `http://localhost:8080/setting-property-management/settings`;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<SystemProperty[]> {
    return this.http.get<SystemProperty[]>(this.systemPropertyUrl);
  }

  public save(properties: SystemProperty[]) {
    return this.http.put<SystemProperty>(this.systemPropertyUrl, properties);
  }

}
