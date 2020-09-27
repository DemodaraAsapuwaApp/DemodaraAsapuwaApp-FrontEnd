import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SettingsService} from '../../services/settings.service';
import {SystemProperty} from '../../objects/system-property';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBars} from '../../shared/snack.bars';
import {PropertyCode} from '../../shared/property.code';
import {SettingResponse} from '../../objects/setting.response';
import {tap} from 'rxjs/operators';
import {DialogBoxes} from '../../shared/dialog.boxes';
import {PaymentReason} from '../../objects/payment-reason';

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
  defDonateReason = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  accName = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  accNo = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('^[0-9]\\d*$')]);
  bankName = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  bankBranch = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  settingResponse = new SettingResponse();

  constructor(private service: SettingsService,
              private snackBars: SnackBars,
              private dialogBoxes: DialogBoxes) {
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  private loadProperties() {
    this.service.findAll().subscribe(p => {
        this.settingResponse = p;
        this.masterEmail.setValue(this.getByCode(PropertyCode.MASTER_EMAIL).value);
        this.ccEmails.setValue(this.getByCode(PropertyCode.CC_EMAILS).value);
        this.midEvalExpDate.setValue(this.getByCode(PropertyCode.MID_EVAL_EXP_DATE).value);
        this.endEvalExpDate.setValue(this.getByCode(PropertyCode.END_EVAL_EXP_DATE).value);
        this.toleranceDateRange.setValue(this.getByCode(PropertyCode.TRANS_DATE_TOLERANCE).value);
        this.defDonateReason.setValue(this.getByCode(PropertyCode.DEFAULT_DONATION_REASON).value);
        this.accName.setValue(this.getByCode(PropertyCode.ACCOUNT_NAME).value);
        this.accNo.setValue(this.getByCode(PropertyCode.ACCOUNT_NUMBER).value);
        this.bankName.setValue(this.getByCode(PropertyCode.BANK_NAME).value);
        this.bankBranch.setValue(this.getByCode(PropertyCode.BANK_BRANCH).value);
      },
      (error: HttpErrorResponse) => {
        this.snackBars.openErrorSnackBar('Error loading system properties from system. ' + error.error);
      });
  }

  getByCode(code: PropertyCode): SystemProperty {
    return this.settingResponse.systemPropertyList.filter(p => p.code === code.valueOf())[0];
  }

  getErr(fc: FormControl) {
    if (fc.hasError('required')) {
      return 'You must enter a value';
    }
    if (fc.hasError('email')) {
      return 'Not a valid email';
    }
    if (fc.hasError('pattern') && fc === this.ccEmails) {
      return 'Not a valid email list';
    }
    if (fc.hasError('pattern') && fc === this.accNo) {
      return 'Not a valid account number';
    }
    if (fc.hasError('min')) {
      return 'You must enter a date higher or equal than 0';
    }
    if (fc.hasError('maxLength')) {
      return 'the reason cann not exceed more than 200 characters';
    }
    return fc.hasError('max') ? 'You must enter a date less than 29' : '';
  }

  validInput(): boolean {
    return !(this.masterEmail.valid && this.ccEmails.valid && this.midEvalExpDate.valid &&
      this.endEvalExpDate.valid && this.toleranceDateRange.valid && this.defDonateReason.valid &&
      this.accName.valid && this.accNo.valid && this.bankName.valid && this.bankBranch.valid &&
      this.settingResponse.systemPropertyList !== undefined);
  }

  save() {
    this.getByCode(PropertyCode.MASTER_EMAIL).value = this.masterEmail.value;
    this.getByCode(PropertyCode.CC_EMAILS).value = this.ccEmails.value;
    this.getByCode(PropertyCode.MID_EVAL_EXP_DATE).value = this.midEvalExpDate.value;
    this.getByCode(PropertyCode.END_EVAL_EXP_DATE).value = this.endEvalExpDate.value;
    this.getByCode(PropertyCode.TRANS_DATE_TOLERANCE).value = this.toleranceDateRange.value;
    this.getByCode(PropertyCode.DEFAULT_DONATION_REASON).value = this.defDonateReason.value;
    this.getByCode(PropertyCode.ACCOUNT_NAME).value = this.accName.value;
    this.getByCode(PropertyCode.ACCOUNT_NUMBER).value = this.accNo.value;
    this.getByCode(PropertyCode.BANK_NAME).value = this.bankName.value;
    this.getByCode(PropertyCode.BANK_BRANCH).value = this.bankBranch.value;
    this.settingResponse.paymentReasonList = this.settingResponse.paymentReasonList.filter(r => !r.deletionMarked);
    this.service.save(this.settingResponse).subscribe(s => {
        this.loadProperties();
        this.snackBars.openInfoSnackBar('System Properties saved.');
      },
      (error: HttpErrorResponse) => {
        this.snackBars.openErrorSnackBar('Error saving system properties to system. ' + error.error);
      });
  }

  deleteReason($event: MouseEvent, id: number) {
    $event.stopPropagation();
    const paymentReasons: PaymentReason[] = this.settingResponse.paymentReasonList.filter(r => r.id === id);
    paymentReasons.forEach(r => r.deletionMarked = !r.deletionMarked);
  }

  addReason() {
    this.dialogBoxes.addReasonDialog('Add Reason', this.settingResponse.paymentReasonList)
      .pipe(
        tap(ans => console.log('confirmation answer: ' + JSON.stringify(ans))),
      ).subscribe(r => {
        const reason = new PaymentReason();
        reason.id = -1;
        reason.code = r.code;
        reason.value = r.value;
        this.settingResponse.paymentReasonList.push(reason);
      }
    );
  }
}
