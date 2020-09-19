import {SystemProperty} from './system-property';
import {PaymentReason} from './payment-reason';

export class SettingResponse {
  systemPropertyList: SystemProperty[];
  paymentReasonList: PaymentReason[];
}
