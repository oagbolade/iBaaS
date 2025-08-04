export const reportsData = [
  {
    title: 'ACCOUNT ENQUIRY',
    menu_name: 'ACCOUNT DETAILS',
    link: '/report/custom-report/account-enquiry',
    description:
      'Detailed information about a specific account including account holder details, transaction history, and account balance.'
  },
  {
    title: 'CHEQUE BOOK STATUS',
    menu_name: 'CHEQUE BOOK STATUS',
    link: '/report/custom-report/cheque-book',
    description: 'Details of issued cheque books, whether active or expired.'
  },
  {
    title: 'STATEMENT OF ACCOUNT',
    menu_name: 'STATEMENTS',
    link: '/report/custom-report/statement-account',
    description:
      'View recent account activities and access the summary of transactions on a particular account.'
  },
  {
    title: 'DORMANT ACCOUNT',
    menu_name: 'DORMANT ACCOUNTS',
    link: '/report/custom-report/dormant-account',
    description: 'View accounts that have been inactive for a period.'
  },
  {
    title: 'PLAIN TRIAL BALANCE',
    menu_name: 'PLAIN TRIAL BALANCE',
    link: '/report/custom-report/plain-trial',
    description:
      'Comprehensive summary of all accounts and their balances without additional details.'
  },
  {
    title: 'STANDING INSTRUCTION',
    menu_name: 'STANDING INSTRUNCTIONS',
    link: '/report/custom-report/standing-instructions',
    description:
      'Detailed standing instructions for recurring payments or transfers.'
  },
  {
    title: 'CUSTOMER BALANCE',
    menu_name: 'CUSTOMER BALANCES',
    link: '/report/custom-report/customer-balances',
    description:
      'View customer balance report to see the current balance in each customer’s account.'
  },
  {
    title: 'TELLER POSTING SUMMARY',
    menu_name: 'TELLER POSTINGS SUMMARY',
    link: '/report/custom-report/teller-posting',
    description: 'View transactions performed by a teller within a set period.'
  },
  {
    title: 'HOLDING TRANSACTION',
    menu_name: 'HOLDT TRANS',
    link: '/report/custom-report/holding-transactions',
    description:
      'Generate, access, and monitor holding account report of transactions in pending or holding state.'
  },
  {
    title: 'PORTFOLIO AT RISK',
    menu_name: 'PORTFOLIO AT RISK',
    link: '/report/custom-report/portfolio-risk',
    description:
      'Select a bank branch from a list of options and generate the risk report.'
  },
  {
    title: 'PROFIT and LOSS',
    menu_name: 'PROFIT OR LOSS',
    link: '/report/custom-report/profit-loss',
    description:
      'Net profit or loss report to analyze the financial performance of the institution over a period.'
  },
  {
    title: 'INFLOW/OUTFLOW',
    menu_name: 'INFLOW AND OUTFLOW REPORT',
    link: '/report/custom-report/inflow-outflow-report',
    description:
      'View the inflow/outflow report to monitor and analyze cash flow trends within the bank.'
  },
  {
    title: 'TELLER BALANCE',
    menu_name: 'TELLER BALANCE REPORT',
    link: '/report/custom-report/teller-balance',
    description:
      'View cash transactions and balance of a teller till the end of a period.'
  },
  {
    title: 'GROUP MEMBERSHIP',
    menu_name: 'GROUP MEMBERSHIP REPORT',
    link: '/report/custom-report/group-membership',
    description:
      'Access group membership report with detailed information about accounts belonging to specific groups within a financial institution.'
  },
  {
    title: 'PRODUCT SUMMARY',
    menu_name: 'PRODUCT SUMMARY',
    link: '/report/custom-report/product-summary',
    description: 'An overview of the various products offered by the bank.'
  },
  {
    title: 'TERM DEPOSIT MATURITY',
    menu_name: 'TD MATURITY REPORT',
    link: '/report/custom-report/term-deposit',
    description:
      'View and track the maturity dates of the term deposit account and manage the corresponding action'
  },
  {
    title: 'GROUP LOAN REPORT',
    menu_name: 'GROUP LOAN REPORT',
    link: '/report/custom-report/group-loan',
    description:
      'View, monitor, and manage group loan reports extended to specific groups or categories of borrowers.'
  },
  {
    title: 'DRILL DOWN GL REPORT',
    menu_name: 'DRILL DOWN GL REPORT',
    link: '/report/custom-report/drill-down',
    description: 'View and analyze detailed transactions in the general ledger.'
  },
  {
    title: 'BALANCE SHEET',
    menu_name: 'BALANCE SHEET',
    link: '/report/custom-report/balance-sheet',
    description:
      'Generate the balance sheet report to assess the financial health of the bank.'
  },
  {
    title: 'MATURITY LOAN REPORT',
    menu_name: 'MATURITY LOAN REPORT',
    link: '/report/custom-report/maturity-loan',
    description:
      'Detailed report on loans that are reaching the end of their term.'
  },
  // commenting out due to incomplete implementation from the backend or infosite

  // {
  //   title: 'LOAN MATURITY PROFILE',
  //   link: '/report/custom-report/loan-maturity',
  //   description:
  //     'Generate and analyze a loan maturity profile to gain insight into loan portfolio maturity distribution.'
  // },
  {
    title: 'WEEKLY LOAN REPAYMENT',
    menu_name: 'WEEKLY LOAN REPAYMENT REPORT',
    link: '/report/custom-report/weekly-loan',
    description:
      'View customer balance reports to see the current balance in each customer’s account.'
  },
  {
    title: 'CHART OF ACCOUNT',
    menu_name: 'CHART OF ACCOUNTS',
    link: '/report/custom-report/chart-account',
    description:
      'Detailed standing instructions for recurring payments or transfers.'
  },
  {
    title: 'POSTING JOURNAL',
    menu_name: 'POSTING JOURNAL',
    link: '/report/custom-report/posting-journal',
    description: 'See the record of transactions posted to various accounts.'
  },
  {
    title: 'DISBURSED LOAN REPORT',
    menu_name: 'DISBURSED LOANS REPORT',
    link: '/report/custom-report/disbursed-loan',
    description:
      'View, track, and manage detailed summaries of loans that have been disbursed or funded by the financial institution.'
  },
  {
    title: 'TRIAL BALANCE BY DATE',
    menu_name: 'TRIAL BALANCE BY DATE',
    link: '/report/custom-report/trial-balance',
    description:
      'View balance summary and assess the financial position of a bank at a specific period.'
  },
  {
    title: 'TRANSACTION IN CLEARING',
    menu_name: 'TRANSACTIONS IN CLEARING',
    link: '/report/custom-report/transaction-clearing',
    description:
      'View transactions in clearing reports to monitor transactions in the clearing process.'
  },
  // Need clarity on how to get the accurate menu name for running loans
  
  // {
  //   title: 'RUNNING LOANS',
  //   menu_name: 'LOAN STATUS', // needs clarity
  //   link: '/report/custom-report/running-loans',
  //   description:
  //     'Detailed overview of the current status and details of active loans.'
  // },
  {
    title: 'OVERDRAFT REPORT',
    menu_name: 'OVERDRAFT REPORT',
    link: '/report/custom-report/over-draft',
    description:
      'Enable proactive risk management by monitoring accounts within a financial institution that have incurred overdrafts.'
  },
  {
    title: 'INCOME ASSURANCE',
    menu_name: 'INCOME ASSURANCE',
    link: '/report/custom-report/income-assurance',
    description:
      'View the TD maturity report to track the maturity dates of the Time Deposit account and manage the corresponding action.'
  },
  // commenting out due to incomplete implementation from the backend or infosite

  // {
  //   title: 'GROUP REPORT',
  //   link: '/report/custom-report/group-report',
  //   description:
  //     'Consolidate data across multiple accounts or entities within a group.'
  // },
  {
    title: 'LOAN OVERDUE',
    menu_name: 'LOAN OVERDUE',
    link: '/report/custom-report/loan-overdue',
    description:
      'Monitor and manage loans that have missed their payment due date or have become past due.'
  },
  {
    title: 'ACCOUNTS IN DEBIT',
    menu_name: 'ACCOUNTS IN DEBIT REPORT',
    link: '/report/custom-report/account-debit',
    description:
      'View information about bank accounts with a debit balance to manage and recover outstanding debt owed.'
  }
];
