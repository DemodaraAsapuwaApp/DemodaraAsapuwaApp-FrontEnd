import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankRecord} from '../../../shared/bank.record';
import {MatPaginator} from '@angular/material/paginator';
import {FileService} from '../../../services/file.service';
import {combineLatest} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Member} from '../../../objects/member';
import {MemberService} from '../../../services/member.service';

@Component({
  selector: 'app-transaction-match',
  templateUrl: './transaction-match.component.html',
  styleUrls: ['./transaction-match.component.css']
})
export class TransactionMatchComponent implements OnInit {
  dataSource = new MatTableDataSource<BankRecord>();
  displayedColumns: string[] = ['txnDate', 'description', 'credit', 'donator', 'degree'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selectedMembers: Member[];

  constructor(private fs: FileService, private ms: MemberService) {
    combineLatest([fs.bankRecordSubject$, fs.markedMemberSubject$, fs.fileUploadSubject$]).pipe(
      tap(([records, selectedMembers, next]) => {
        console.log('transactionMatch change triggered');
        this.selectedMembers = selectedMembers;
      }),
      switchMap(([records, members, next]) => fs.matchTransactions(records, members)),
      tap(members => {
        console.log('matched Transactions: ' + JSON.stringify(members));
      })
    ).subscribe(records => {
      this.dataSource.data = records;
    });

    fs.transactionMatchSubject$.subscribe(nextClicked => {
      const filteredRecords = this.dataSource.data.filter(r => r.memberId > 0);
      fs.processedBankRecordSubject$.next(filteredRecords);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
