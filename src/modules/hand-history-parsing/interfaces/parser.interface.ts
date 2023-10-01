import { ParsedHandHistory } from './parsed-hand-history.interface';

export interface ParsedReturnData {
  data: ParsedHandHistory[];
  parsedNumber: number;
  rejectedNumber: number;
  rejectedTournamentPlo: number;
  rejectedCashNlh: number;
  rejectedCashPlo: number;
  rejectedCashOther: number;
  rejectedTournamentOther: number;
  rejectedOther: number;
}
