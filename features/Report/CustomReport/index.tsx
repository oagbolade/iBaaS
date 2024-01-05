'use client';
import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { cardsDetailsContainer, customReportContainer } from './style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';
import { TextInput } from '@/components/FormikFields';

export const CustomReports = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="ACCOUNT ENQUIRY"
              link="/report/custom-report/account-enquiry"
              description="Detailed information about a specific account including account holder details, transaction history, and account balance."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/cheque-book"
              title="CHEQUE BOOK STATUS"
              description="Details of issues cheque book. Whether active or expired"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/statement-account"
              title="STATEMENT OF ACCOUNT"
              description="View recent account activities and access the summary of transaction on a particular account"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/dormant-account"
              title="DORMANT ACCOUNT"
              description="View accounts that have been inactive for a period"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/plain-trial"
              title="PLAIN TRIAL BALANCE"
              description="Comprehensive summary of all accounts and their balances without additional details"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/standing-instructions"
              title="STANDING INSTRUCTION"
              description="Detailed standing instructions for recurring payments or transfers"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/customer-balances"
              title="CUSTOMER BALANCE"
              description="View customers balance report to see the current balance in each customer’s account"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/teller-posting"
              title="TELLER POSTING SUMMARY"
              description="View transactions performed by a teller within a set period"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/holding-transactions"
              title="HOLDING TRANSACTION"
              description="Generate, access and monitor holding account report of transactions in pending or holding state"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/portfolio-risk"
              title="PORTFOLIO AT RISK"
              description="Select bank branch from a list of options and generate the risk report."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/profit-loss"
              title="PROFIT and LOSS"
              description="Net profit or loss report to analyze the financial performance of the institution over a period"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/inflow-outflow-report"
              title="INFLOW/OUTFLOW"
              description="View the inflow/outflow report to monitor and analyze cashflow trend within the bank."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/teller-balance"
              title="TELLER BALANCE"
              description="View cash transaction and balance of a teller till the end of a period"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/group-membership"
              title="GROUP MEMBERSHIP"
              description="Access group membership report detailed information about accounts that belongs to specific group within a financial institution"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/product-summary"
              title="PRODUCT SUMMARY"
              description="An overview of the various products offered by the bank"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/trial-balance"
              title="TRIAL BALANCE"
              description="View and track the maturity dates of the Time deposit account and manage the corresponding action"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/group-loan"
              title="GROUP LOAN REPORT"
              description="View, monitor and manage group loan report that have extended to specific group or category of borrowers"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/drill-down"
              title="DRILL DOWN GL REPORT"
              description="View and analyze detailed transactions in the general ledger"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="BALANCE SHEET"
              description="Generate the balance sheet report to assess the financial health of the bank"
              link="/report/custom-report/balance-sheet"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/maturity-loan"
              title="MATURITY LOAN REPORT"
              description="Detailed report on loans that are reaching the end of their term"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/loan-maturity"
              title="LOAN MATURITY PROFILE"
              description="Generate and analyze a loan maturity profile to gain insight to loan portfolio maturity distribution"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/weekly-loan"
              title="WEEKLY LOAN REPAYMENT"
              description="View customers balance report so that I see the current balance in each customer’s account"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="CHART OF ACCOUNT"
              link="/report/custom-report/chart-account"
              description="Detailed standing instructions for recurring payments or transfers"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/posting-journal"
              title="POSTING JOURNAL"
              description="See the record of transactions posted to various accounts"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/disbursed-loan"
              title="DISBURSED LOAN REPORT"
              description="View, track and manage detailed summary of loans that have been disbursed or funded by the financial institution"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="TRIAL BALANCE BY DATE"
              description="View balance summary and assess the financial position of a bank at a specific period"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/transaction-clearing"
              title="TRANSACTION IN CLEARING"
              description="view transactions in clearing report so that I monitor transactions in the clearing process"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="RUNNING LOANS"
              description="Detailed overview of the current status and details of active loans"
              link="/report/custom-report/running-loans"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="OVERDRAFT REPORT"
              description="Enable proactive risk management by monitoring account within a financial institution that have incurred overdraft"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="INCOME ASSURANCE"
              description="View the TD maturity report to track the maturity dates of the Time deposit account and manage the corresponding action"
              link="/report/custom-report/income-assurance"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="GROUP REPORT"
              description="Consolidate data across multiple accounts or entities within a group"
              link="/report/custom-report/group-report"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/loan-overdue"
              title="LOAN OVERDUE"
              description="Monitor and manage loans that have missed their payment due date or have become past due"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/report/custom-report/account-debit"
              title="ACCOUNTS IN DEBIT"
              description="View information about bank account with a debit balance to manage and recover outstanding debt owed"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
