import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SystemPropertyService} from '../../services/system-property.service';
import {SystemProperty} from '../../objects/system-property';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {
  masterEmail = new FormControl('', [Validators.required, Validators.email]);
  ccEmails = new FormControl('', [Validators.required, Validators.pattern('^([\\w+-.%]+@[\\w-.]+\\.[A-Za-z]{2,4},?)+$')]);
  midEvalExpDate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(28)]);
  endEvalExpDate = new FormControl('', [Validators.required, Validators.min(0), Validators.max(28)]);
  toleranceDateRange = new FormControl('', [Validators.required, Validators.min(0), Validators.max(28)]);
  private systemProperties: SystemProperty[] | undefined;

  constructor(private service: SystemPropertyService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  private loadProperties() {
    this.service.findAll().subscribe(p => {
        this.systemProperties = p;
        this.masterEmail.setValue(this.getByCode(this.service.MASTER_EMAIL).value);
        this.ccEmails.setValue(this.getByCode(this.service.CC_EMAILS).value);
        this.midEvalExpDate.setValue(this.getByCode(this.service.MID_EVAL_EXP_DATE).value);
        this.endEvalExpDate.setValue(this.getByCode(this.service.END_EVAL_EXP_DATE).value);
        this.toleranceDateRange.setValue(this.getByCode(this.service.TRANS_DATE_TOLERANCE).value);
      },
      error => {
        console.log('loading system settings failed');
        console.log(error.message);
        this.openSnackBar('Loading System Settings Failed.' + error.message, '');
      });
  }

  getByCode(code: string): SystemProperty {
    return this.systemProperties.filter(p => p.code === code)[0];
  }

  getErrMasterEmail() {
    if (this.masterEmail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.masterEmail.hasError('email') ? 'Not a valid email' : '';
  }

  getErrCcEmails() {
    if (this.ccEmails.hasError('required')) {
      return 'You must enter a value';
    }
    return this.ccEmails.hasError('pattern') ? 'Not a valid email list' : '';
  }

  getErrEvalExpDate(expDateControl: FormControl) {
    if (expDateControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (expDateControl.hasError('min')) {
      return 'You must enter a date higher or equal than 0';
    }
    return expDateControl.hasError('max') ? 'You must enter a date less than 29' : '';
  }

  validInput(): boolean {
    return !(this.masterEmail.valid && this.ccEmails.valid && this.midEvalExpDate.valid &&
      this.endEvalExpDate.valid && this.toleranceDateRange.valid &&
      this.systemProperties !== undefined);
  }

  save() {
    this.getByCode(this.service.MASTER_EMAIL).value = this.masterEmail.value;
    this.getByCode(this.service.CC_EMAILS).value = this.ccEmails.value;
    this.getByCode(this.service.MID_EVAL_EXP_DATE).value = this.midEvalExpDate.value;
    this.getByCode(this.service.END_EVAL_EXP_DATE).value = this.endEvalExpDate.value;
    this.getByCode(this.service.TRANS_DATE_TOLERANCE).value = this.toleranceDateRange.value;
    this.service.save(this.systemProperties).subscribe(s => {
        this.loadProperties();
      },
      error => {
        console.log('loading system settings failed');
        console.log(error.message);
        this.openSnackBar('Saving System Settings Failed.' + error.message, '');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
