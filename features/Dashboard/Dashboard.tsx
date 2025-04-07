'use client';
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PendingTasks } from './PendingTasks';
import { RecentlyVisitedModules } from './RecentlyVisitedModules';
import { setupAndPendingContainer } from './styles';
import { BasicSetup } from './BasicSetup';
import { TrendCard } from '@/features/Report/CustomReport/GroupReport/CustomerService/OfficerPerformance/TrendCard';
import { mainTitle } from '@/features/CustomerService/styles';
import { description } from '@/components/Confirmation/styles';
import { useGetTellerBalanceByUserId } from '@/api/operation/useVaultManagement';
import { FormSkeleton } from '@/components/Loaders';
import { useGetPendingRequest } from '@/api/loans/useFetchPendingRequest';
import { getStoredUser } from '@/utils/user-storage';
import useSingleTabSession from '@/utils/useSessionTimeout';

export const Dashboard = () => {
  const { total, dRtotal, cRtotal, isLoading } = useGetTellerBalanceByUserId();
  const { authsdetails } = useGetPendingRequest();
  const pendingData = authsdetails?.length || 0;
  const formattedTotal = total ? `₦${total.toLocaleString()}` : '₦0';
  const totalDRCR = cRtotal + dRtotal;
  const totalPercentage = total ? ((totalDRCR / total) * 100) / 1 : 0;
  const roundedTotalPercentage = Number.isNaN(totalPercentage)
    ? '0.00'
    : totalPercentage.toFixed(2);
  useSingleTabSession();

  if (isLoading) {
    return (
      <Box my={6}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          padding: '25px',
          width: '100%',
          marginTop: '80px'
        }}
      >
        <Box mb={2}>
          <Box>
            <Typography sx={mainTitle}>
              Welcome back,{' '}
              {getStoredUser()?.fullName || 'Oops!. Cannot find user name'}
            </Typography>
          </Box>
          <Box>
            <Typography sx={description}>
              Get an overview of all your system activities
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              width: '100%'
            }}
          >
            <TrendCard
              customStyle={{
                width: '98%'
              }}
              isPositiveTrend={false}
              // percentage={roundedTotalPercentage}
              title="Till Balance"
              amount={formattedTotal}
            />
            <TrendCard
              customStyle={{
                width: '98%'
              }}
              title="Pending Actions"
              amount={pendingData?.toString()}
            />
          </Box>
          <RecentlyVisitedModules />
        </Stack>
        <Box sx={setupAndPendingContainer}>
          <BasicSetup />
          <PendingTasks />
        </Box>
      </Box>
    </Box>
  );
};
