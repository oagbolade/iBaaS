'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import {
  EndofDayContainerForm,
  processPassingStyle,
  processRunningStyle,
  processNumber,
  totalProcesTitle,
  totalTitle
} from './style';
import { PageTitle } from '@/components/Typography';
import { useGetEODResult } from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';

export const CreateEndOfDayForm = () => {
  const { data, isLoading } = useGetEODResult();
  if (isLoading) {
    return <FormSkeleton noOfLoaders={3} />;
  }
  return (
    <Box sx={EndofDayContainerForm}>
      <Box sx={processPassingStyle}>
        <Box sx={processNumber}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <PageTitle
                title="total processes Passed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="80%" styles={{ ...totalTitle }} />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="total processes failed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="20%" styles={{ ...totalTitle }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={processRunningStyle}>View details</Box>
    </Box>
  );
};
