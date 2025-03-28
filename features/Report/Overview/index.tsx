'use client';
import React from 'react';
import { Chart } from 'react-google-charts';
import { Box, Grid } from '@mui/material';
import { TopOverViewSection } from './TopOverViewSection';
import { ReportSummary } from '@/components/Cards/ReportSummary';
import {
  bardata,
  baroptions,
  doughnutData,
  doughnutOptions,
  lineOptions,
  linedata
} from '@/constants/Reports/graphs';

export const OverView = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection />
      <Grid container spacing={2.5}>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Check Book Status"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Statement of Account"
            link="/report/custom-report/statement-account"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Posting Journal"
            link="/report/custom-report/posting-journal"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Transaction in Clearing"
            link="/report/custom-report/transaction-clearing"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Dormant Account"
            link="/report/custom-report/dormant-account"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Holding Transaction"
            link="/report/custom-report/holding-transactions"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={12}>
          <ReportSummary
            customStyle={{ width: '100%' }}
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Trial Balance"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="AreaChart"
              data={linedata}
              options={lineOptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Profit or Loss"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Loan Overdue"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Maturity Loan"
            link="/report/custom-report/maturity-loan"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Disbursed Loan"
            link="/report/custom-report/disbursed-loan"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>

        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES']}
            title="Inflow/Outflow"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="PieChart"
              data={doughnutData}
              options={doughnutOptions}
            />
          </ReportSummary>
        </Grid>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Overdraft"
            link="/report/custom-report/cheque-book"
          >
            <Chart
              chartType="ColumnChart"
              data={bardata}
              options={baroptions}
            />
          </ReportSummary>
        </Grid>
      </Grid>
    </Box>
  );
};
