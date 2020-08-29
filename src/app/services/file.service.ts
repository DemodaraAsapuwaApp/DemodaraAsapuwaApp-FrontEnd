import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  public markedMemberSubject$ = new Subject<Member[]>();
  public bankRecordSubject$ = new Subject<BankRecord[]>();
  public fileUploadSubject$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  public previewFile(file: File): Observable<BankRecord[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<BankRecord[]>(this.previewFileUrl, formData);
  }

  public matchTransactions(records: BankRecord[], members: Member[]): Observable<BankRecord[]> {
    const body: TransMatch = new TransMatch();
    body.members = members;
    body.records = records;
    return this.http.post<BankRecord[]>(this.matchTransactionsUrl, body);
  }

}
