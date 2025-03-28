import { ITellerBalance } from '../../operation/useVaultManagement';
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

export interface IInflowOutflowList {
  accountnumber: string;
  accounttitle: string;
  productcode: string;
  productName: string;
  branchcode: string;
  inflow: number;
  outflow: number;
}

export interface PlainTrialBalanceResponse {
  responseCode: string;
  responseDescription: string;
  plainTrialBalanceList: PlainTrialBalanceList;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

interface PlainTrialBalanceList {
  pagedRecords: TrialBalanceRecord[];
  totalDr: number;
  totalCr: number;
  bkBalance: number;
}

interface TrialBalanceRecord {
  id: number;
  glNumber: string;
  oldGLno: string | null;
  acctName: string;
  dr: number;
  cr: number;
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
export interface IGlMainGroupReportList {
  gl_NodeName: string;
  gL_NodeCode: string;
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
  branch: string;
  productCode: string;
}
export interface ITransactionClearing {
  accountnumber: string;
  amt: number;
  tranName: string;
  processed: string;
  chequeType: string;
  bankName: string;
  value_Dt: string;
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
  actionCode1Model?: IIncomeAssurance[];
}
export interface GetAllTransactionClearingReportResponse
  extends IFetchingState,
    IReportsResponse {
  transactionsinClearingList?: ITransactionClearing[];
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
  totalname: string;
}
export interface TrailBalanceResponse extends IFetchingState, IReportsResponse {
  trialBydateList?: ITrialBalance[];
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
export interface IGlMainGroupResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  glMainGroupRptList?: IGlMainGroupReportList[];
}
export interface IGlSubGroupResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  glSubGroupRptList?: IGlSubGroupReportList[];
}

export interface InflowOutflowReportResponse
  extends IFetchingState,
    IReportsResponse {
  inflowOutflowList?: IInflowOutflowList[];
  totalInflow?: number;
  totalOutflow?: number;
}
