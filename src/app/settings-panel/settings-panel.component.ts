import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent {
  masterEmail = new FormControl('', [Validators.required, Validators.email]);
  ccEmails = new FormControl('', [Validators.required, Validators.pattern('^([\\w+-.%]+@[\\w-.]+\\.[A-Za-z]{2,4},?)+$')]);
  midEvalExpDate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(28)]);
  endEvalExpDate = new FormControl('', [Validators.required, Validators.min(0), Validators.max(28)]);
  toleranceDateRange = new FormControl('', [Validators.required, Validators.min(0), Validators.max(28)]);

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
    return !(this.masterEmail.valid && this.ccEmails.valid && this.midEvalExpDate.valid && this.endEvalExpDate.valid && this.toleranceDateRange.valid);
  }
}
