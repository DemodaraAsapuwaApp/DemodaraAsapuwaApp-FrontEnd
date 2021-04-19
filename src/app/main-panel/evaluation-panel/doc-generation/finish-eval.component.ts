import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankRecord} from '../../../shared/bank.record';
import {MatPaginator} from '@angular/material/paginator';
import {SummaryEntry} from '../../../shared/summary.entry';
import {FileService} from '../../../services/file.service';
import {combineLatest} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-finish-eval',
  templateUrl: './finish-eval.component.html',
  styleUrls: ['./finish-eval.component.css']
})
export class FinishEvalComponent implements OnInit {
  dataSource = new MatTableDataSource<SummaryEntry>();
  displayedColumns: string[] = ['name', 'amount', 'notify'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private fs: FileService) {
    const bankRecords$ = fs.processedBankRecordSubject$.pipe(
      map(records => records.filter(r => r.memberId > 0))
    );

    combineLatest([fs.markedMemberSubject$, bankRecords$]).pipe(
      tap(([selectedMembers, processedRecords]) => {
        console.log('generate doc triggered');
      }),
      map(([selectedMembers, records]) => {
        const recordMap: Map<number, BankRecord[]> = this.groupBy<number, BankRecord>(records, (r: BankRecord) => r.memberId);
        return selectedMembers.map<SummaryEntry>(m => ({
          memberId: m.id,
          memberName: m.preferredName,
          amount: (recordMap.has(m.id) ? recordMap.get(m.id) : []).reduce((total, brecord) => {
            return total + brecord.cr;
          }, 0),
          greeting: true,
          warning: false
        }));
      })
    ).subscribe(summeries => {
      this.dataSource.data = summeries;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  groupBy<K, V>(list: V[], keyGetter: (T) => K): Map<K, V[]> {
    const returnMap = new Map<K, V[]>();
    list.forEach((item) => {
      const key: K = keyGetter(item);
      const collection: V[] = returnMap.get(key);
      if (!collection) {
        returnMap.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return returnMap;
  }

}
