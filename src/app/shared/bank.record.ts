export class BankRecord {
  txnDate: Date;
  description: string;
  cr: number;
  memberId?: number;
  matchDegree?: MatchDegree;
}

export enum MatchDegree {
  PERFECT = 'PERFECT',
  DOUBTFUL = 'DOUBTFUL',
  NO_MATCH = 'NO_MATCH'
}
