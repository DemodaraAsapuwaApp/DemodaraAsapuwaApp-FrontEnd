import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankRecord} from '../../../shared/bank.record';
import {MatPaginator} from '@angular/material/paginator';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-transaction-match',
  templateUrl: './transaction-match.component.html',
  styleUrls: ['./transaction-match.component.css']
})
export class TransactionMatchComponent implements OnInit {
  dataSource = new MatTableDataSource<BankRecord>();
  displayedColumns: string[] = ['txnDate', 'description', 'credit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private fileService: FileService) {
    fileService.bankRecordSubject.subscribe(records => {
      this.dataSource.data = records;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
