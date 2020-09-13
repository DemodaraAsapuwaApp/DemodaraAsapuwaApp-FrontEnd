import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {SnackBars} from '../../../shared/snack.bars';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BankRecord} from '../../../shared/bank.record';
import {tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Moment} from 'moment';
import * as _moment from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FileUploadComponent implements OnInit {
  dataSource = new MatTableDataSource<BankRecord>();
  displayedColumns: string[] = ['txnDate', 'description', 'credit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  toggleView: boolean;
  file: File;
  date = new FormControl(moment());

  constructor(private fileService: FileService,
              private snackBars: SnackBars) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue: Moment = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue: Moment = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  csvInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    console.log(file);
    this.fileService.previewFile(file, this.date.value.month() + 1, this.date.value.year()).pipe(
      tap<BankRecord[]>((records: BankRecord[]) => {
          this.snackBars.openInfoSnackBar('File upload complete. ');
        }
      ),
    ).subscribe(r => {
        this.dataSource.data = r;
        this.file = file;
        this.fileService.bankRecordSubject$.next(r);
      },
      error => {
        this.snackBars.openErrorSnackBar('Error uploading file. ' + error.error[0]);
        this.dataSource.data = [];
        this.file = undefined;
        this.fileService.bankRecordSubject$.next([]);
      }
    );
  }

  toggleViewFormat() {
    this.toggleView = !this.toggleView;
  }
}
