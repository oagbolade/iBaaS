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
  linedata,
} from '@/constants/Reports/graphs';

export const OverView = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '50px',
      }}
    >
      <TopOverViewSection />
      <Grid container spacing={3}>
        <Grid item desktop={6}>
          <ReportSummary
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Check Book Status"
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
            customStyle={{ width: '1277px' }}
            filter={['ALL_BRANCHES', 'TRANSACTION_VOLUME', 'AMOUNT']}
            title="Trial Balance"
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
            title="Check Book Status"
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
