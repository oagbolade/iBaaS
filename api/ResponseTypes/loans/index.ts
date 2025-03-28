/* eslint-disable import/no-cycle */
import { IFetchingState } from '@/constants/types';
import { ViewDetailsResponseType } from '@/mocks';

export interface ILoans {
  productcode: string;
  productname: string;
  productClass: string;
  productType: string;
}

export interface ILoanAccountDetails {
  out_Interest: number;
  out_penal: number;
  startdate: string;
  matdate: string;
  currentbalance: number;
  settlementAcctBal: number;
  totaldays: string;
  intRate: string;
  termFreq: string;
  repaytype: number;
  loanTerm: string;
  branch: string;
  productCode: string;
  settlementacct1: string;
  settlementAcct: string;
  loanAmount: number;
  colltype: number;
  customerID: string;
  colldesc: string;
  loansource: number;
  narration: string;
  calcmethod: number;
  status: string;
  fullName: string;
  writeOffGL: string;
  out_ExtInterest: number;
  repaymentType: string;
  branchName: string;
  calculationName: string;
  productName: string;
  collvalue: string;
}

export interface IFetchAllUserRequest {
  id: number;
  requestType: string;
  requestDate: string;
  postingOfficer: string;
  approvingOfficer: string;
}
export interface IFetchRejectedRequest {
  id: number;
  requestType: string;
  rejectDate: string;
  postingOfficer: string;
  approvingOfficer: string;
  rejectReason: string;
}
export interface IGetPendingRequest {
  id: number;
  tablename: string;
  authdesc: string;
  authid: string;
  posttype: string;
  createdate: string;
  authstatus: string;
  searchfield: string;
  authdate: string;
  latestupdate: string;
  post_user: string;
  narration: string;
}

export interface GetLoanAccountDetailsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  settlementAccount?: string;
  loanAccDetails?: ILoanAccountDetails;
}

export interface GetOverdraftDetailResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  odAccDetails: {
    accountNumber: string;
    fullName: string;
    faclityType: string;
    tenor: string;
    interestFrequency: string;
    amount: string;
    interestRate: string;
    penalRate: string;
    interestAmount: string;
    effective_dt: string;
    expiryDate: string;
    status: string;
    reportDate: string;
  };
}

export interface GetCustomerLoanAcct {
  responseCode: string;
  responseMessage: string;
  data: {
    accountnumber: string;
  };
}
export interface IProductLoanPurpose {
  purposeCode: string;
  purposeName: string;
}

export interface IProductLoanRepayment {
  repayid: string;
  repaydesc: string;
}

export interface ILoansource {
  loansourceid: string;
  loansourcedesc: string;
}

export interface ILoanCollateral {
  collateralID: string;
  collateralDesc: string;
}

export interface productLoanRepayment {
  responseCode: string;
  responseDescription: string;
  repaymentTypes: Array<any>;
}

export interface ProductLoanDetails {
  responseCode: string;
  responseDescription: string;
  loanProducts: object;
}

export interface ILoanCollaterals {
  responseCode: string;
  responseDescription: string;
  collaterals: ILoanCollateral;
}

export interface AllLoanProductsResponse {
  responseCode?: string;
  responseDescription?: string;
  loans?: ILoans[] | Array<any>;
}

export interface ProductLoanPurpose {
  responseCode: string;
  responseDescription: string;
  loanPurpose: IProductLoanPurpose;
}

export interface createLoanUnderWritingResponse {
  responseCode: string;
  responseDescription: string;
  acctNo: string;
  postSeq: number;
}
export interface FetchAllUserRequestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IFetchAllUserRequest[];
}

export interface ViewAuthDetailsGeneral extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  columns?: ViewDetailsResponseType[];
}
export interface GetPendingRequestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  authsdetails?: IGetPendingRequest[];
}
export interface GetRejectectedRequestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IFetchRejectedRequest[];
}
export interface ApprovePendingRequestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
}
export interface RejectPendingRequestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
}

export interface LoanAccountDetailPreview {
  accountnumber: string;
  branch: string;
  productcode: string;
  productname: string;
  fullname: string;
  totaldays: number;
  loantype: number;
  discounted: number;
  penalRate: number;
  accruedInterest: null;
  interestdue: number;
  outStandingInt: number;
  monthlyinterest: number;
  principaldue: number;
  principalpaid: number;
  interestpaid: number;
  intInterestDue: number;
  approvedAmount: number;
  startdate: string;
  matdate: string;
  disburse: number;
  loanterm: number;
  freqname: string;
  intrate: number;
  minintrate: number;
  currentbalance: number;
  maxintrate: number;
  loanamount: number;
  currencycode: string;
  statusdesc: string;
  loanpurpose: string;
  settlementacct1: string;
  status: string;
  customerid: string;
  paymentGL: null;
  firstpmtdate: string;
  calcmethod: number;
  termfreq: string;
  loanschedcalcdesc: string;
  repaytype: number;
  repaydesc: string;
  remainterm: null;
}

export interface GetLoanByAccountDetailsResponse extends IFetchingState {
  responseCode?: string;
  responseMessage?: string;
  data?: LoanAccountDetailPreview;
}
