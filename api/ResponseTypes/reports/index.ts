import { JSX } from 'react';
import { IFetchingState } from '@/constants/types';

interface IReportsResponse {
  responseCode?: string;
  responseDescription?: string;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
}

export interface IChequeBookList {
  accountnumber: string;
  serialno: number;
  createdate: string;
  range: string;
  narration: string;
  status: number;
}

export interface ChequeBookStatusResponse extends IFetchingState {
  responseCode: string;
  responseDescription: string;
  chequeBookList: IChequeBookList[];
}

export interface ICustomerBalance {
  branchcode: string;
  branchname: string;
  productcode: string;
  productname: string;
  accountnumber: string;
  accounttitle: string;
  lastdatepay: string;
  address: string;
  bkbalance: number;
  suspbal: number;
  dateopened: string;
  holdbal: number;
  odlimit: number;
  todlimit: number;
  pendingCC: number;
  availBal: number;
}

interface CustomerBalanceList {
  pagedCustomerBalances: ICustomerBalance[];
  totalBkBal: number;
  totalAvaiBal: number;
  grandTotal: number;
}

export interface CustomerBalanceResponse extends IFetchingState {
  responseCode: string;
  responseDescription: string;
  customerBalanceList: CustomerBalanceList;
  pageNummber: number;
  pageSize: number;
  totalRecords: number;
}
export interface IAuditTrail {
  id: number;
  action_performed: string;
  userId: string;
  old_data: string;
  new_data: string;
  eff_date: string;
  status: number;
  authid: string;
  createDate: string;
  tablename: string;
  menuname: string;
  procedurename: string;
}

export interface AuditTrailsResponse extends IFetchingState {
  responseCode: string;
  responseDescription: string;
  auditTrailList: IAuditTrail[];
}

export interface IPlainTrialBalance {
  id: number;
  glNumber: string;
  oldGLno: string;
  acctName: string;
  dr: number;
  cr: number;
}

export interface IPortfolioAtRiskProduct {
  branch: string;
  branchname: string;
  productCode: string;
  productName: string;
  principal_At_Risk: number;
  currentbalance: number;
  number_of_Accounts: number;
  par: number;
}

export interface IPortfoliodetailedReport {
  accountnumber: string;
  fullname: string;
  startdate: string;
  matdate: string;
  loanAmount: number;
  currentbalance: number;
  principal_At_Risk: number;
  par: number;
  productcode: string;
  branch: string;
  productname: string;
  branchname: string;
}

export interface ITellerPostingReport {
  accountNumber: string;
  accounttitle: string;
  userid: string;
  tranDate: string;
  valuedate: string;
  tranname: string;
  prevbal: number;
  curbal: number;
  deposit: number;
  withdrawal: number;
  fromVault: number;
  toVault: number;
  refNo: string;
  postseq: string;
  debitacct: string;
  creditAcct: string;
  postingMode: string;
  narration: string;
  tranAmount: string;
}

export interface IInflowOutflowList {
  accountnumber: string;
  accounttitle: string;
  productcode: string;
  productName: string;
  branchcode: string;
  inflow: number;
  outflow: number;
}
export interface TrialBalanceRecord {
  id: number;
  glNumber: string;
  oldGLno: string | null;
  acctName: string;
  dr: number;
  cr: number;
}

interface PlainTrialBalanceList {
  pagedRecords: TrialBalanceRecord[];
  totalDr: number;
  totalCr: number;
  bkBalance: number;
}
export interface PlainTrialBalanceResponse {
  responseCode: string;
  responseDescription: string;
  plainTrialBalanceList: PlainTrialBalanceList;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export interface IGetAccountEnquiry {
  accountnumber: string;
  accounttitle: string;
  customerid: number;
  accountOfficer: string;
  bkBalance: number;
  branchName: string;
}

export interface IAccountInDebitResponse extends IGetAccountEnquiry {}

export interface ITellerBalanceReportResponse {
  tillNumber: string;
  tillName: string;
  staffName: string;
  branchcode: string;
  branchName: string;
  userid: string;
  bkBalance: number;
}

export interface IGetLoanOverdueReport {
  id: number;
  accountNumber: string;
  groupid: string;
  branch: string;
  productCode: string;
  settlementAcct1: string;
  fullname: string;
  loanamount: number;
  currentbalance: number;
  total_OverDue: number;
  startdate: string;
  matDate: string;
  branchname: string;
  maxtrandate: string;
  principal_Outstanding: number;
  interest_Outstanding: number;
  penalInterest_Outstanding: number;
  officerName: string;
  groupname: string;
  lastDate: string;
  officerName2: string;
  groupName2: string;
  casa_Balance: number;
  age: number;
  report: string;
}

export interface IGetDisbursedLoanReport {
  id: number;
  accountNumber: string;
  customerID: string;
  bkBalance: string;
  branch: string;
  productName: string;
  productCode: string;
  settlementAcct1: string;
  fullName: string;
  startDate: string;
  matDate: string;
  loanAmount: string;
  currentbalance: number;
  groupid: string;
  bvn: string;
  phone1: string;
  address: string;
  gender: string;
  officerName: string;
  groupname: string;
  loanStageCycle: number;
  riskRating: string;
  remarks: string;
}
export interface IGlMainGroupReportList {
  pagedMainGroupReports: {
    gl_NodeName: string;
    gL_NodeCode: string;
    total: string;
  }[];
  total: number;
}
export interface IGlSubGroupReportList {
  gL_ClassName: string;
  gL_ClassCode: string;
  total: number;
}

export interface IAccountEnquiryResponse
  extends IFetchingState,
    IReportsResponse {
  accountsinDebitList?: IGetAccountEnquiry[];
}
export interface IAccountInDebitResponseType
  extends IFetchingState,
    IReportsResponse {
  accountsinDebitList?: IAccountInDebitResponse[];
}
export interface IGetTellerBalanceReportResponseType
  extends IFetchingState,
    IReportsResponse {
  tellerBalanceList?: ITellerBalanceReportResponse[];
}

export interface ILoanOverdueReportResponse
  extends IFetchingState,
    IReportsResponse {
  loanOverDueList?: IGetLoanOverdueReport[];
}

export interface IDisbursedLoanReportResponse
  extends IFetchingState,
    IReportsResponse {
  disbursedLoans?: IGetDisbursedLoanReport[];
}

export interface ITdMaturityReport {
  customerID: string;
  fullName: string;
  accountNumber: string;
  productCode: string;
  productName: string;
  tdAmount: number;
  intRate: number;
  tdPurpose: string;
  startDate: string;
  matDate: string;
  currentBalance: number;
  interest_At_Maturity: number;
  accrued_Interest: number;
  tenor: number;
  totalDays: undefined;
}

export interface ITdMaturityReportByDate {
  customerID: string;
  fullName: string;
  accountNumber: string;
  productCode: string;
  productName: string;
  tdAmount: number;
  intRate: number;
  tdPurpose: string;
  matDate: string;
  currentBalance: number;
  interestPaid: number;
  totalDays: number;
}
export interface IGroupLoanReportParam {
  startDate?: string;
  endDate?: string;
  branchId?: string | null;
  tellerId?: string | null;
  pageSize?: number;
  pageNumber?: number;
}

export interface ITermDepositMaturityReportResponse
  extends IFetchingState,
    IReportsResponse {
  tdMaturityReportList?: ITdMaturityReport[];
  tdMaturityReportByDateList?: ITdMaturityReportByDate[];
}

export interface IChartOfAccount {
  class: string;
  prodtypecode: string;
  glnumber: string;
  last_night_balance2: number;
  branchcode: string;
  gl_nodecode: string;
  gl_classcode: string;
  prodtypename: string;
  gl_nodename: string;
  gl_classname: string;
  branchname: string;
  acctname: string;
}
export interface IGroupLoan {
  groupid: string;
  groupname: string;
  loanamount: number;
  currentbalance: number;
}
export interface IStandingInstruction {
  sinumber: number;
  fromaccountnumber: string;
  toaccountnumber: string;
  create_dt: string;
  end_dt: string;
  sireason: string;
  nextDate: string;
  frequency: string;
}
export interface IIncomeAssurance {
  accountnumber: string;
  fullname: string;
  startdate: string;
  matdate: string;
  intrate: number;
  loanamount: number;
  accrued_Int: number;
  branchCode: string;
  branchName: string;
  productCode: string;
  productcode: string;
  productName: string;
}
export interface ITransactionClearing {
  id: string;
  accountnumber: string;
  accounttitle: string;
  create_dt: string;
  valuedate: string;
  status: string;
  tranamount: string;
  userid: string;
  bankname: string;
  chequeno: string;
  narration: string;
  chequetype: string;
  branchcode: string;
}

export interface ChartOfAccountResponse
  extends IFetchingState,
    IReportsResponse {
  chartofAccountList?: IChartOfAccount[];
}
export interface GetAllGroupLoanReportResponse
  extends IFetchingState,
    IReportsResponse {
  groupLoanReportList?: IGroupLoan[];
}
export interface GetAllStandingInstructionsResponse
  extends IFetchingState,
    IReportsResponse {
  siTransactions?: IStandingInstruction[];
}
export interface GetAllIncomeAssuranceReportResponse
  extends IFetchingState,
    IReportsResponse {
  data?: IIncomeAssurance[];
}
export interface GetAllTransactionClearingReportResponse
  extends IFetchingState,
    IReportsResponse {
  data?: ITransactionClearing[];
}
export interface ITrialBalance {
  reportClass: string;
  prodtypecode: string;
  last_night_balance2: number;
  branchcode: string;
  gl_nodecode: string;
  gl_classcode: string;
  prodtypename: string;
  gl_nodename: string;
  gl_classname: string;
  branchname: string;
  system_Date: string;
  acctno: string;
  acctname: string;
  debitacct: number;
  creditAcct: number;
  differ: string;
  acctName: string;
  debitAcct: string;
  lastNightBalance: string;
  totalname: string;
}

export interface ITrialBalanceGroup {
  balance: number;
  gl_classname: string;
  gl_classcode: string;
  prodtypecode: string;
  gl_nodecode: string;
}
export interface TrailBalanceGroupResponse
  extends IFetchingState,
    IReportsResponse {
  trialBydateList?: ITrialBalanceGroup[];
}
export interface TrailBalanceResponse extends IFetchingState, IReportsResponse {
  trialBydateList: {
    map(
      arg0: (dataItem: ITrialBalance) => JSX.Element
    ): import('react').ReactNode;
    lastNightBalance: number;
    totalCrBal: number;
    totalDrBal: number;
    totalBal: number;
    pagedTrialBalances: ITrialBalance[];
  };
}

export interface GetAllPortfolioAtRiskResponse
  extends IFetchingState,
    IReportsResponse {
  portfolioatRiskList?: IPortfolioAtRiskProduct[];
}
export interface GetDetailedPortfolioReport
  extends IFetchingState,
    IReportsResponse {
  portfolioatRiskDetailRptList?: IPortfoliodetailedReport[];
  pageNumber?: number;
}
export interface GetTellerPostingReport
  extends IFetchingState,
    IReportsResponse {
  tellerPostByDateList?: ITellerPostingReport[];
  pageNumber?: number;
}

// Drill Down Report
export interface IGlMainGroupResponse extends IFetchingState {
  responseCode: string;
  responseDescription: string;
  glMainGroupRptList: {
    pagedMainGroupReports: {
      gl_NodeName: string;
      gL_NodeCode: string;
      total: string;
    }[];
    total: number;
  };
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export interface IGlSubGroupResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  glSubGroupRptList?: {
    pagedSubGroupReports: IGlSubGroupReportList[];
    total: number;
  };
}

interface GlAccount {
  branchCode: string;
  branchName: string;
  glNumber: string;
  acctName: string;
  bkbalance: number;
}

interface GlClassCodeRptList {
  pagedAccountsByClassCode: GlAccount[];
  total: number;
}

export interface GLAccountsByClassCodeResponse extends IFetchingState {
  responseCode: string;
  responseDescription: string;
  glClassCodeRptList: GlClassCodeRptList;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export interface InflowOutflowReportResponse
  extends IFetchingState,
    IReportsResponse {
  inflowOutflowList?: IInflowOutflowList[];
  totalInflow?: number;
  totalOutflow?: number;
}

export interface IDormantAccountList {
  accountnumber: string;
  accounttitle: string;
  branchcode: string;
  branchname: string;
  productcode: string;
  productname: string;
  officercode: string;
  officerName: string;
  bkbalance: number;
  averagebal: number;
  customerId: number;
}

export interface GetAllDormantAccountResponse
  extends IFetchingState,
    IReportsResponse {
  dormantAccountList?: IDormantAccountList[];
}

export interface ILoanMaturityReport {
  id: number;
  accountNumber: string;
  customerID: string;
  phone1: string;
  branch: string;
  productCode: string;
  settlementAcct1: string;
  fullName: string;
  startDate: string;
  loanMatDate: string;
  adjustedMatDate: string;
  loanAmount: string;
  currentbalance: string;
  gender: string;
  officerName: string;
  groupname: string;
  loanStageCycle: number;
  riskRating: string;
}

export interface ILoanMaturityResponse {
  responseCode: string;
  responseDescription: string;
  loanMaturityList: ILoanMaturityReport[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export interface IPostingJournal {
  accountNumber: string;
  accounttitle: string;
  tranDate: string;
  valuedate: string;
  tranname: string;
  batchno: number;
  postSeq: number;
  debitacct: number;
  creditAcct: number;
  postingMode: string;
  accountModule: string;
  narration: string;
  userid: string;
  authid: string;
  branchcode: string;
}

export interface IPostingJournalResponse
  extends IFetchingState,
    IReportsResponse {
  postingJournalList: IPostingJournal[];
}

interface HoldTrans {
  accountnumber: string;
  create_dt: string;
  effective_dt: string;
  amt: number;
  end_dt: string;
  holdreason: string | null;
}

interface Data {
  pagedHoldTrans: HoldTrans[];
  totalHolding: number;
}

export interface IHoldingTransactionReportResponse {
  responseCode: string;
  responseDescription: string;
  data: Data;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}
