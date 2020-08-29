import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BankRecord} from '../shared/bank.record';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private PreviewFileUrl = `http://localhost:8080/file-management/preview-files`;
  public bankRecordSubject = new Subject<BankRecord[]>();

  constructor(private http: HttpClient) {
  }

  public previewFile(file: File): Observable<BankRecord[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<BankRecord[]>(this.PreviewFileUrl, formData);
  }

}
