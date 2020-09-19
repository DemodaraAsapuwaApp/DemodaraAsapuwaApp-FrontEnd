import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SettingResponse} from '../objects/setting.response';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private systemPropertyUrl = `http://localhost:8080/settings-management/settings`;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<SettingResponse> {
    return this.http.get<SettingResponse>(this.systemPropertyUrl);
  }

  public save(settings: SettingResponse) {
    return this.http.put<SettingResponse>(this.systemPropertyUrl, settings);
  }

}
