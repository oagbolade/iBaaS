import { IFetchingState } from '@/constants/types';

export interface SearchFinanceAccountResponse extends IFetchingState {
  status: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
}
