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




interface SetupTaskProps {
  label: string;
  isChecked: boolean;
  link: string;
  linkText: string;
}



interface DashboardProps {
  branchData: any
  glNodeData: any
  chargeData: any
  productTypes: any
  departmentData: any
  isBranchLoading: boolean
  isChargeLoading: boolean
  isGLLoading: boolean
  isDepartmentLoading: boolean
  isProductTypeLoading: boolean
}

export const Dashboard = ({ branchData, glNodeData, chargeData, productTypes, departmentData,
  isBranchLoading,
  isChargeLoading,
  isGLLoading,
  isDepartmentLoading,
  isProductTypeLoading
}: DashboardProps) => {
  const { total, dRtotal, cRtotal, isLoading } = useGetTellerBalanceByUserId();
  const { authsdetails } = useGetPendingRequest();
  const pendingData = authsdetails?.length || 0;
  const formattedTotal = total ? `₦${total.toLocaleString()}` : '₦0';
  const totalDRCR = cRtotal + dRtotal;
  const totalPercentage = total ? ((totalDRCR / total) * 100) / 1 : 0;
  const roundedTotalPercentage = Number.isNaN(totalPercentage)
    ? '0.00'
    : totalPercentage.toFixed(2);
  if (isLoading) {
    return (
      <Box my={6}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const tasks: SetupTaskProps[] = [
    {
      label: 'Add Branches',
      isChecked: branchData.length > 0,
      link: '/setup/company/branch/',
      linkText: 'Add a branch'
    },
    {
      label: 'Add a product',
      isChecked: productTypes.length > 0,
      link: '/setup/product-gl/product-setup/',
      linkText: 'Add New Product'
    },
    {
      label: 'Add Department',
      isChecked: departmentData.length > 0,
      link: '/setup/company/department/',
      linkText: 'Add Department'
    },
    {
      label: 'Add General Ledger',
      isChecked: glNodeData.length > 0,
      link: '/setup/product-gl/product-class/',
      linkText: 'Add General Ledger'
    },
    {
      label: 'Add Charges',
      isChecked: chargeData.length > 0,
      link: '/setup/product-gl/charge/',
      linkText: 'Add Charges'
    }
  ];

  const completedTasks = tasks.filter((task) => task.isChecked).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;


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
          {completionPercentage < 100 ? (
            <>
              <BasicSetup
                tasks={tasks}
                isBranchLoading={isBranchLoading}
                isChargeLoading={isChargeLoading}
                isGLLoading={isGLLoading}
                isDepartmentLoading={isDepartmentLoading}
                isProductTypeLoading={isProductTypeLoading}
                completionPercentage={completionPercentage}
              />
              <PendingTasks />
            </>
          ) : (
            <Box sx={{ width: '100%' }}>
              <PendingTasks />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
