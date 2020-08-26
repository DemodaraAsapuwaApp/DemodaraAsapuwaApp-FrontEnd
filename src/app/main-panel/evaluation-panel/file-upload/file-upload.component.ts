import {Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {UploadFileResponse} from '../../../objects/upload.file.response';
import {SnackBars} from '../../../shared/snack.bars';
import {HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BankRecord} from '../../../shared/bank.record';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  previewBankRecords: BankRecord[];
  dataSource = new MatTableDataSource<BankRecord[]>();
  displayedColumns: string[] = ['txnDate', 'description', 'credit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  toggleView: boolean;
  previewRecords$: Observable<BankRecord[]>;

  constructor(private fileService: FileService,
              private snackBars: SnackBars) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  csvInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    console.log(file);
    this.previewRecords$ = this.fileService.previewFile(file).pipe(
      tap<BankRecord[]>((records: BankRecord[]) => {
          this.snackBars.openInfoSnackBar('File upload complete. ');
        }
      ),
      catchError(err => {
          this.snackBars.openErrorSnackBar('Error uploading file. ' + err.error[0]);
          return of<BankRecord[]>();
        }
      )
    );
  }

  toggleViewFormat() {
    this.toggleView = !this.toggleView;
  }
}
