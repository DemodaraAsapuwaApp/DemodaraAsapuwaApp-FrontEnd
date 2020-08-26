import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UploadFileResponse} from '../objects/upload.file.response';
import {BankRecord} from '../shared/bank.record';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private PreviewFileUrl = `http://localhost:8080/file-management/preview-files`;

  constructor(private http: HttpClient) {
  }

  public previewFile(file: File): Observable<BankRecord[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<BankRecord[]>(this.PreviewFileUrl, formData);
  }

}
