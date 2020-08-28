import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {SnackBars} from '../../../shared/snack.bars';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BankRecord} from '../../../shared/bank.record';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  dataSource = new MatTableDataSource<BankRecord>();
  displayedColumns: string[] = ['txnDate', 'description', 'credit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  toggleView: boolean;
  file: File;
  @Output() uploadedFile = new EventEmitter<File>();

  constructor(private fileService: FileService,
              private snackBars: SnackBars) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  csvInputChange(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    console.log(file);
    this.fileService.previewFile(file).pipe(
      tap<BankRecord[]>((records: BankRecord[]) => {
          this.snackBars.openInfoSnackBar('File upload complete. ');
        }
      ),
    ).subscribe(r => {
        this.dataSource.data = r;
        this.file = file;
        this.uploadedFile.emit(file);
      },
      error => {
        this.snackBars.openErrorSnackBar('Error uploading file. ' + error.error[0]);
        this.dataSource.data = [];
        this.file = undefined;
        this.uploadedFile.emit(undefined);
      }
    );
  }

  toggleViewFormat() {
    this.toggleView = !this.toggleView;
  }
}
