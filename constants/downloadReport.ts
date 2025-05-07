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
  | 'TellerPostingSummary';

interface IFileNameMapper {
  AccountEnquiry: string;
  [key: string]: string;
}

export const FileNameMapper: IFileNameMapper = {
  AccountEnquiry: 'AccountEnquiryReport',
  StatementOfAccountCASA: 'StatementOfAccountCASA',
  StatementOfAccountTD: 'StatementOfAccountTD',
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
  TellerPostingSummary: 'TellerPostingSummary'
};
