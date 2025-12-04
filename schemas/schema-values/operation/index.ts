import { String } from 'lodash';
import { getStoredUser } from '@/utils/user-storage';

export interface CreateBatchPostingFormValues {
  accountNumber: string;
  batchno: string;
  chequeno: string;
  userid: string;
  computedAmount: string;
  currency: string;
  narration: string;
  tellerno: string;
  trancode: string;
  valueDate: string;
  rolelevel: number;
  menuid: number;
}
export interface IClearingParams {
  bankcode?: string;
  cleartype?: string;
}

export interface CreateBulkUploadFormValues {
  file: string;
}
export interface CreateBulkInsPostBulkFormValues {
  Typ_BulkTran: string;
  Menuid: number;
}
export interface CreateChargeConcessionFormValues {
  accountnumber: string;
  originatingAccount: string;
  chargetype: string;
  chargeamount: number;
  amount: number;
  authid: string;
}

export const chargeConcessionInitialValues: CreateChargeConcessionFormValues = {
  accountnumber: '',
  originatingAccount: '', // TODO: get clarity from infosight on what account number to use here,
  chargetype: '',
  chargeamount: 0,
  amount: 0,
  authid: 'string'
};
export const BulkUploadInitialValues: CreateBulkUploadFormValues = {
  file: ''
};
export const BulkInsPostBulkInitialValues: CreateBulkInsPostBulkFormValues = {
  Typ_BulkTran: '',
  Menuid: 15
};
export const BatchPostingInitialValues: CreateBatchPostingFormValues = {
  accountNumber: '',
  batchno: '',
  chequeno: '',
  userid: `${getStoredUser()?.profiles?.userid}`,
  computedAmount: '',
  currency: '',
  narration: '',
  tellerno: '',
  trancode: '',
  valueDate: '',
  rolelevel: 0,
  menuid: 0
};
export interface CreateReturnChequesFormValues {
  accountNumber: string;
  clearingBankCode: string;
  chequeNumber: string;
  payAmount: number;
  valueDate: string;
  narration: string;
  currencycode: string;
  rate: number;
  dueDate: string;
}
export interface CreateCashDepositFormValues {
  accountNumber: string;
  transAmount: number;
  rate: number;
  valueDate: string;
  narration: string;
  currencyCode: string;
  tellerno: number;
  action: number;
}
export const ReturnChequeInitialValues: CreateReturnChequesFormValues = {
  accountNumber: '',
  clearingBankCode: '',
  chequeNumber: '',
  payAmount: 0,
  valueDate: '',
  narration: '',
  rate: 1,
  dueDate: '',
  currencycode: ''
};
export const CashDepositInitialValues: CreateCashDepositFormValues = {
  accountNumber: '',
  transAmount: 0,
  rate: 1,
  valueDate: '',
  narration: '',
  currencyCode: '',
  tellerno: 0,
  action: 0
};

export interface CreateChequeDepositFormValues {
  accountNumber1: string;
  accountNumber2: string;
  transAmount: number;
  rate: number;
  valueDate: string;
  narration: string;
  currencyCode: string;
  tellerno: number;
  action: number;
  cheqNumber: number;
}

export interface CreateInWardClearingFormValues {
  debitAcct: string;
  tranamount: number;
  valuedate: string;
  auth_id: string;
  inp_Branch: string;
  narration1: string;
  reversal: string;
  currencyCode: string;
  drProductclass: string;
  crProductclass: string;
  crossrate: number;
  tellerno: number;
  chkNum: number;
  cleartype: string;
  chequetype: string;
  bankcode: string;
  axpostseq: number;
  initUserid: string;
  overide: number;
  overideid: string;
  subbranch: string;
}
export interface CreateOutWardClearingFormValues {
  creditAcct: string;
  tranamount: number;
  valuedate: string;
  auth_id: string;
  inp_Branch: string;
  narration1: string;
  reversal: string;
  currencyCode: string;
  drProductclass: string;
  crProductclass: string;
  crossrate: number;
  tellerno: number;
  chkNum: number;
  cleartype: string;
  chequetype: string;
  bankcode: string;
  axpostseq: number;
  initUserid: string;
  overide: number;
  overideid: string;
  subbranch: string;
}

export interface CreateChequeWithdrawalFormValues {
  accountNumber1: string;
  accountNumber2: string;
  userId: string;
  transAmount: number;
  rate: number;
  valueDate: string;
  narration: string;
  currencyCode: string;
  tellerno: number;
  action: number;
  cheqNumber: number;
}
export const OutwardClearingInitialValues: CreateOutWardClearingFormValues = {
  creditAcct: '',
  tranamount: 0,
  valuedate: '',
  auth_id: `${getStoredUser()?.profiles?.userid}`,
  inp_Branch: 'string',
  narration1: '',
  reversal: '0',
  currencyCode: '',
  drProductclass: 'string',
  crProductclass: 'string',
  crossrate: 1,
  tellerno: 0,
  chkNum: 0,
  cleartype: '',
  chequetype: '',
  bankcode: '',
  axpostseq: 0,
  initUserid: 'string',
  overide: 0,
  overideid: 'string',
  subbranch: 'string'
};

export const InwardClearingInitialValues: CreateInWardClearingFormValues = {
  debitAcct: '',
  tranamount: 0,
  valuedate: '',
  auth_id: 'string',
  inp_Branch: 'string',
  narration1: '',
  reversal: '0',
  currencyCode: '',
  drProductclass: 'string',
  crProductclass: 'string',
  crossrate: 1,
  tellerno: 0,
  chkNum: 0,
  cleartype: '',
  chequetype: 'string',
  bankcode: '',
  axpostseq: 0,
  initUserid: 'string',
  overide: 0,
  overideid: 'string',
  subbranch: 'string'
};
export const ChequeWithdrawalInitialValues: CreateChequeWithdrawalFormValues = {
  accountNumber1: '',
  accountNumber2: '',
  userId: `${getStoredUser()?.profiles?.userid}`,
  transAmount: 0,
  rate: 1,
  valueDate: '',
  narration: '',
  currencyCode: '',
  tellerno: 0,
  action: 0,
  cheqNumber: 0
};

export const ChequeDepositInitialValues: CreateChequeDepositFormValues = {
  accountNumber1: '',
  accountNumber2: '',
  transAmount: 0,
  rate: 1,
  valueDate: '',
  narration: '',
  currencyCode: '',
  tellerno: 0,
  action: 0,
  cheqNumber: 0
};

export interface NipTransferFormValues {
  debitAcct: string;
  creditAcct: string;
  tranamount: number;
  drTranCode: string;
  crTranCode: string;
  valuedate: string;
  userID: string;
  auth_id: string;
  inp_Branch: string;
  narration1: string;
  reversal: string;
  currencyCode: string;
  drProductclass: string;
  crProductclass: string;
  crossrate: number;
  tellerno: number;
  chkNum: number;
  cleartype: string;
  chequetype: string;
  bankcode: string;
  axpostseq: number;
  initUserid: string;
  overide: number;
  overideid: string;
  subbranch: string;
  channel: string;
  chargeGl: string;
  trancharge: number;
  takeChgFlg: string;
  narration2: string;
}

export interface MakeNipTransferType {
  nameEnquiryRef: string;
  bankCode: string;
  sourceBankCode: string;
  channelCode: string;
  beneficiaryAccountName: string;
  beneficiaryAccountNumber: string;
  originatorAccountName: string;
  originatorAccountNumber: string;
  originatorBvn: string;
  originatorKycLevel: string;
  location: string;
  narration: string;
  amount: number;
}

export const NipTransferInitialValues: NipTransferFormValues = {
  debitAcct: '',
  creditAcct: '',
  tranamount: 0,
  drTranCode: 'string',
  crTranCode: 'string',
  valuedate: '',
  userID: 'string',
  auth_id: 'string',
  inp_Branch: 'string',
  narration1: '',
  reversal: '',
  currencyCode: '',
  drProductclass: 'string',
  crProductclass: 'string',
  crossrate: 0,
  tellerno: 0,
  chkNum: 0,
  cleartype: '',
  chequetype: 'string',
  bankcode: '',
  axpostseq: 0,
  initUserid: 'string',
  overide: 0,
  overideid: 'string',
  subbranch: 'string',
  channel: 'string',
  chargeGl: 'string',
  trancharge: 0,
  takeChgFlg: '',
  narration2: 'string'
};

export interface FundTransferFormValues {
  debitAcct: string;
  creditAcct: string;
  tranamount: number;
  drTranCode: string;
  crTranCode: string;
  valuedate: string;
  tellerno: number;
  inp_Branch: string;
  narration1: string;
  reversal: string;
  currencyCode: string;
  drProductclass: string;
  crProductclass: string;
  crossrate: number;
  transfertype: string;
  channel: string;
  overide: number;
  overideid: string;
  subbranch: string;
  userID: string;
  auth_id: string;
  chkNum: string;
}

export const FundTransferInitialValues: FundTransferFormValues = {
  debitAcct: '',
  creditAcct: '',
  tranamount: 0,
  drTranCode: '',
  crTranCode: '',
  valuedate: '',
  tellerno: 0,
  inp_Branch: '',
  narration1: '',
  reversal: '0',
  currencyCode: '',
  drProductclass: '',
  crProductclass: '',
  crossrate: 1,
  transfertype: 'string',
  channel: '',
  overide: 0,
  overideid: 'string',
  subbranch: '',
  userID: `${getStoredUser()?.profiles?.userid}`,
  auth_id: '',
  chkNum: ''
};

export interface CreateCashWithdrawalFormValues {
  accountNumber: string;
  transAmount: number;
  rate: number;
  valueDate: string;
  narration: string;
  currencyCode: string;
  tellerno: number;
  overline: number;
  overlineid: string;
  action: number;
}

export const CashWithdrawalInitialValues: CreateCashWithdrawalFormValues = {
  accountNumber: '',
  transAmount: 0,
  rate: 1,
  valueDate: '',
  narration: '',
  currencyCode: '',
  tellerno: 0,
  overline: 0,
  overlineid: 'string',
  action: 0
};

export interface CreateCashJournalFormValues {
  debitAcct: string;
  creditAcct: string;
  tranamount: number;
  valuedate: number;
  userID: string;
  auth_id: string;
  narration1: string;
  reversal: string;
  currencyCode: string;
  tellerno: number;
  chkNum: number;
  chequetype: number;
  bankcode: string;
  axpostseq: number;
  initUserid: string;
  subbranch: string;
  rate: number;
  balancedAmount: number;
}

export const CreateCashJournlInitalValues: CreateCashJournalFormValues = {
  debitAcct: '',
  creditAcct: '',
  tranamount: 0,
  valuedate: 0,
  userID: `${getStoredUser()?.profiles?.userid}`,
  auth_id: `${getStoredUser()?.profiles?.userid}`,
  narration1: '',
  reversal: '0',
  currencyCode: '',
  tellerno: 0,
  chkNum: 0,
  chequetype: 0,
  bankcode: '',
  axpostseq: 0,
  initUserid: 'string',
  subbranch: 'string',
  rate: 1,
  balancedAmount: 0
};

export interface NipGetBeneficiaryInformationResponse {
  nameInquiryReference: string;
  bankCode: string;
  channelCode: string;
  accountNumber: string;
  accountName: string;
  code: string;
}
export interface VaultManagementValues {
  action: string;
  branchcode: string;
  glaccno: string;
  telleraccno: string;
  tranAmount: string;
  narration: string;
  userid: string;
  overline: string;
  overlineid: string;
}

export const VaultManagementInitialValues: VaultManagementValues = {
  action: '',
  branchcode: '',
  glaccno: '',
  telleraccno: '',
  tranAmount: '',
  narration: '',
  userid: '',
  overline: '',
  overlineid: ''
};
