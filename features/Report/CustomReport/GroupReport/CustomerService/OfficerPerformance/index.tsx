'use client';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import Chart from 'react-google-charts';
import { TrendCard } from './TrendCard';
import { FilterSection } from './FilterSection';
import {
  OfficePerformanceContainer,
  OfficePerformanceName,
  OfficerGraphSection,
} from '@/features/Report/CustomReport/GroupReport/styles';
import { description } from '@/components/Confirmation/styles';
import { pageTitle } from '@/components/Typography/styles';
import { lineOptions, linedatav2 } from '@/constants/Reports/graphs';
import colors from '@/assets/colors';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

export const OfficerPerformance = () => {
  return (
    <Box
      sx={{
        marginTop: '50px',
        width: '100%',
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '25px',
        }}
      >
        <FilterSection />
        <Box sx={OfficePerformanceContainer}>
          <Box sx={OfficePerformanceName}>
            <Box>
              <Typography sx={description}>Officer Name</Typography>
            </Box>
            <Box>
              <Typography sx={pageTitle}>Opeyemi Olatogun</Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={2} sx={{ marginTop: '16px' }}>
            <Box>
              <TrendCard
                title="Total Balance"
                amount="₦1,432,453.32"
                percentage="- 11.8%"
                isPositiveTrend
              />

              <TrendCard
                title="Total No of Accounts"
                amount="32,543"
                percentage="- 2.3%"
                isPositiveTrend={false}
              />

              <TrendCard
                title="Performance Rating"
                amount="5.54"
                percentage="- 3.5%"
                isPositiveTrend
              />
            </Box>
            <Box sx={OfficerGraphSection}>
              <Box>
                <Typography sx={{ ...pageTitle, fontSize: '20px' }}>
                  Average Deposit Ratio
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item desktop={6}>
                  <Chart
                    chartType="AreaChart"
                    data={linedatav2}
                    options={{
                      ...lineOptions,
                      width: 900,
                      height: 330,
                      colors: [`${colors.greenLine}`],
                      chartArea: { top: 80, left: 50 },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
