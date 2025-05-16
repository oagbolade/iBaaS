export const accountEnquiryColumns = [
  'Customer Name',
  'Account Number',
  'Available Balance',
  'Phone Number',
  'Account Officer',
  'Ledger balance'
];
export const loanOverdueColumns = [
  'Account Number',
  'Product Code',
  'Loan Amount',
  'Start Date',
  'Maturity Date',
  'Principal Outstanding'
];

export const disbursedloanColumns = [
  'Account Number',
  'Account Name',
  'Group Name',
  'Officer Name',
  'Facility Amount'
];

export const detailedPortfolioAtRiskColumn = [
  'Account Number',
  'Account Name',
  'Start Date',
  'Maturity Date',
  'Principal at Risk',
  'Loan Amount',
  'Loan Balance',
  'PAR (%)'
];

export const tellerPostingColumn = [
  'Account Number',
  'Account title',
  'Narration',
  'Value Date',
  'Reference'
];

export const drillDownReportGlColumns = [
  'GL Node Name',
  'GL Node Code',
  'Total'
];

export const drillSubDownReportGlColumns = [
  'Gl Class Name',
  'Gl Class Code',
  'total'
];
export const drillClassCodeDownReportGlColumns = [
  'Branch Name',
  'Gl Number',
  'Account Name',
  'total'
];

export const drillKeys = ['branchName', 'glNumber', 'acctName', 'bkbalance'];

export const drilSubMainKey = ['gL_ClassName', 'gL_ClassCode', 'total'];

export const drilMainKey = ['gl_NodeName', 'gL_NodeCode', 'total'];

export const inflowOutflowReportColumn = [
  'Account Number',
  'Account Name',
  'Product Code',
  'Product Name',
  'Branch Code',
  'Inflow',
  'Outflow'
];

export const accountDebitInReportColumns = [
  'Account Number',
  'Account Title',
  'Customer ID',
  'Book Balance',
  'Account Officer',
  'Branch'
];

export const tellerblanceReportcolumn = [
  'Till Number',
  'Till Name',
  'Staff Name',
  'Branch Code',
  'User ID',
  'Till Balance'
];
