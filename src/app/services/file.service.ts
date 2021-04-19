import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BankRecord} from '../shared/bank.record';
import {Member} from '../objects/member';
import {TransMatch} from '../shared/trans.match';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private previewFileUrl = `http://localhost:8080/file-management/preview-files`;
  private matchTransactionsUrl = `http://localhost:8080/file-management/match-transactions`;
  private genConfirmDocUrl = `http://localhost:8080/file-management/files/gen-doc`;
  public markedMemberSubject$ = new Subject<Member[]>();
  public bankRecordSubject$ = new Subject<BankRecord[]>();
  public fileUploadSubject$ = new Subject<boolean>();
  public transactionMatchSubject$ = new Subject<boolean>();
  public processedBankRecordSubject$ = new Subject<BankRecord[]>();

  constructor(private http: HttpClient) {
  }

  public previewFile(file: File, month: number, year: number): Observable<BankRecord[]> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('month', month.toString());
    formData.append('year', year.toString());
    return this.http.post<BankRecord[]>(this.previewFileUrl, formData);
  }

  public matchTransactions(records: BankRecord[], members: Member[]): Observable<BankRecord[]> {
    const body: TransMatch = new TransMatch();
    body.members = members;
    body.records = records;
    return this.http.post<BankRecord[]>(this.matchTransactionsUrl, body);
  }


  genConfirmDoc(memberId: number, fileName: string, issueDate: Date): Observable<Blob> {
    const url = this.genConfirmDocUrl + `/${memberId}`;
    let params = new HttpParams();
    params = params.append('fileName', fileName);
    params = params.append('issueDate', issueDate.toString());
    return this.http.get(url, {
      params,
      responseType: 'blob'
    });
  }

  convertToStr(v: boolean): string {
    return v ? 'true' : 'false';
  }

  download(fileName: string,  download: boolean): Observable<Blob> {
    let params = new HttpParams();
    params = params.append('download', this.convertToStr(download));
    return this.http.get(`http://localhost:8080/file-management/${fileName}`, {
      params,
      responseType: 'blob'
    });
  }
}
