import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PendingTasks } from './PendingTasks';
import { RecentlyVisitedModules } from './RecentlyVisitedModules';
import { TrendCard } from '@/features/Report/CustomReport/GroupReport/CustomerService/OfficerPerformance/TrendCard';
import { mainTitle } from '@/features/CustomerService/styles';
import { description } from '@/components/Confirmation/styles';

export const Dashboard = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px',
      }}
    >
      <Box mb={2}>
        <Box>
          <Typography sx={mainTitle}>Welcome back, [ User-Name ]</Typography>
        </Box>
        <Box>
          <Typography sx={description}>Get an overview of all your system activities</Typography>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Box
          sx={{
            width: '100%',
          }}
        >
          <TrendCard
            customStyle={{
              width: '98%',
            }}
            isPositiveTrend={false}
            percentage="-2.3%"
            title="Till Balance"
            amount="₦1,132,432.32"
          />
          <TrendCard
            customStyle={{
              width: '98%',
            }}
            title="Pending Actions"
            amount="101"
          />
        </Box>
        <RecentlyVisitedModules />
      </Stack>
      <PendingTasks />
    </Box>
  );
};
