import { IFetchingState } from '@/constants/types';

export interface ITransactionType {
  trancode: string;
  tranname: string;
}

export interface IEODLogs {
  id: number;
  lastRunDate: string;
  startTime: string;
  endTime: string;
  totalUncompletedPercetage: number;
  totalCompletedPercetage: number;
  userId: string;
  fullName: string;
  status: number;
  createdOn: string;
}
export interface IEODViewLogs {
  taskid: number;
  taskname: string;
  procName: string;
  startTime: string;
  endTime: string;
  procDate: string;
  taskStatus: string;
}
export interface IEODProcess {
  taskid: number;
  taskname: string;
  startTime: string;
  endTime: string;
  procDate: string;
  taskStatus: string;
  eoddate: string;
  status: string;
  retMsg: string;
  createDate: string;
  actionCode: number;
}
export interface IGetZone {
  zoneid: string;
  zoneName: string;
  nodays: number;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface IGetClearingBank {
  bankcode: string;
  bankname: string;
}
export interface IGenerateBatchNo {
  batchno: string;
}
export interface ISystemDate {
  systemDate: string;
  systemPhase: number;
  userName: string;
  role: string;
  approvingOfficer: string;
}
export interface IChargeConcessionType {
  chargeCode: string;
  chargeDesc: string;
  chargeBasis: number;
  chargeAmt: number;
  liqMode: number;
  amortFreq: number;
  amortBasis: number;
  glCode: string;
  branchMask: string;
  status: number;
  overdrawAcct: number;
  targetBase: string;
  turnover: number;
  liqPeriod: number;
  userId: string;
  authId: string;
  frequency: string;
  createDate: string;
  chargeReceivable: string;
  susChrgGL: string;
  chargeAgainst: string;
  amortizeType: number;
  accrualRequired: number;
}
export interface ICounterCheqNo {
  CounterCheqNo: string;
}

export interface GetAllClearingBanksResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  zones?: IGetZone[] | Array<any>;
  clearBanks?: IGetClearingBank[] | Array<any>;
}

export interface GetAllCounterCheqNo extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  nextCounterCheqNo?: ICounterCheqNo;
}
export interface GetAllTransactionTypeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  details?: ITransactionType[] | Array<any>;
}

export interface GetAllEODDAYResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IEODViewLogs[] | Array<any>;
}
export interface GetProcessEODDAYResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IEODProcess[] | Array<any>;
}
export interface GetEODDAYResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IEODLogs[] | Array<any>;
}

export interface GetGenerateBatchNoResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  batchno?: IGenerateBatchNo;
}
export interface UseGetChargeConcessionResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  charges?: IChargeConcessionType[] | Array<any>;
}
export interface GetAllSystemDateResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  sysmodel?: ISystemDate;
}

export interface INibbsBankData {
  bankCode: string;
  bankName: string;
}

export interface UseGetbeneficiaryDetails extends IFetchingState {
  nameInquiryReference: string;
  bankCode: string;
  channelCode: string;
  accountNumber: string;
  accountName: string;
  code: string;
}
export interface UseGetNibbsBanks extends IFetchingState {
  code?: string;
  time?: string;
  data?: INibbsBankData[];
}

export interface NipGetBeneficiaryInformationPayload {
  bankCode: string;
  accountNumber: string;
  channelCode: string;
}

export interface NipGetBanksPayload {
  sessionID: string;
  nameEnquiryRef: string;
  destinationInstitutionCode: string;
  channelCode: string;
  beneficiaryAccountName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBankVerificationNumber: string;
  beneficiaryKYCLevel: string;
  originatorAccountName: string;
  originatorAccountNumber: string;
  originatorBankVerificationNumber: string;
  originatorKYCLevel: string;
  transactionLocation: string;
  narration: string;
  paymentReference: string;
  amount: number;
}
