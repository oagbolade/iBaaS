export type ReportType =
  | 'AccountEnquiry'
  | 'StatementOfAccountCASA'
  | 'StatementOfAccountTD'
  | 'DormantAccount'
  | 'TermDepositMaturity'
  | 'TellerBalance'
  | 'TransactionInClearing'
  | 'PortfolioAtRisk'
  | 'PortfolioAtRiskProductList'
  | 'TellerBalance'
  | 'InflowOutflow'
  | 'CheckBookStatus'
  | 'ChartOfAccount'
  | 'CustomerBalance'
  | 'AccountDebit'
  | 'ChequeBookStatus'
  | 'TrialBalanceByDate'
  | 'TrialBalanceByDate'
  | 'PlainTrialBalance'
  | 'MaturityLoan'
  | 'PostingJournal'
  | 'LoanOverdueReport'
  | 'TellerPostingSummary'
  | 'IncomeAssuranceReport'
  | 'HoldingTransaction'
  | 'GLMainGroupReport'
  | 'GLSubMainGroupReport'
  | 'StatementOfAccount'
  | 'ProductSummary'
  | 'ProductSummaryDetails'
  | 'GLAccountClassReport'
  | 'GroupMembership'
  | 'StandingInstructionReport'
  | 'ProfitAndLoss'
  | 'AuditTrail'
  | 'OverdraftReport'
  | 'EOD';

interface IFileNameMapper {
  AccountEnquiry: string;
  [key: string]: string;
}

export const FileNameMapper: IFileNameMapper = {
  ProfitAndLoss: 'ProfitAndLossReport',
  AccountEnquiry: 'AccountEnquiryReport',
  StatementOfAccountCASA: 'StatementOfAccountCASA',
  StatementOfAccountTD: 'StatementOfAccountTD',
  IncomeAssuranceReport: 'IncomeAssuranceReport',
  DormantAccount: 'DormantAccount',
  CheckBookStatus: 'CheckBookStatus',
  InflowOutflow: 'InflowOutflow',
  TermDepositMaturity: 'TermDepositMaturity',
  TellerBalance: 'TellerBalance',
  TransactionInClearing: 'TransactionInClearing',
  PortfolioAtRisk: 'PortfolioAtRisk',
  PortfolioAtRiskProductList: 'PortfolioAtRiskProductList',
  CustomerBalance: 'CustomerBalance',
  PlainTrialBalance: 'PlainTrialBalance',
  ChequeBookStatus: 'ChequeBookStatus',
  TrialBalanceByDate: 'TrialBalanceByDate',
  MaturityLoan: 'MaturityLoan',
  PostingJournal: 'PostingJournal',
  TellerPostingSummary: 'TellerPostingSummary',
  HoldingTransaction: 'HoldingTransaction',
  LoanOverdueReport: 'LoanOverdueReport',
  ProductSummary: 'ProductSummary',
  ProductSummaryDetails: 'ProductSummaryDetails',
  GLMainGroupReport: 'GLMainGroupReport',
  GLSubMainGroupReport: 'GLSubMainGroupReport',
  GLAccountClassReport: 'GLAccountClassReport',
  ChartOfAccount: 'ChartOfAccount',
  GroupMembership: 'GroupMembership',
  StandingInstructionReport: 'StandingInstructionReport',
  AuditTrail: 'AuditTrailReport',
  OverdraftReport: 'OverdraftReport',
  EOD: 'EOD'
};
