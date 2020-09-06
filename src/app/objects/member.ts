import {Address} from './address';

export class Member {
  id: number;
  isSelected: boolean;
  preferredName: string;
  fullName: string;
  nicNo: string;
  amount: number;
  description: string;
  transactionDate: Date;
  dob: Date;
  membershipDate: Date;
  tpNo: string;
  email: string;
  addedDate: Date;
  lastModifyDate: Date;
  address: Address;

  constructor() {
    this.address = new Address();
  }
}
