'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import {
  EndofDayContainerForm,
  processPassingStyle,
  processRunningStyle,
  processNumber,
  totalProcesTitle,
  totalTitle
} from './style';
import { PageTitle } from '@/components/Typography';
import { useCreateRunEOD } from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';

export const CreateEndOfDayForm = () => {
  const {
    mutate,
    isPending,
    isError,
    error,
    data: eodResponse
  } = useCreateRunEOD();

  if (isPending) {
    return <FormSkeleton noOfLoaders={3} />;
  }

  return (
    <Box sx={EndofDayContainerForm}>
      <Box sx={processPassingStyle}>
        <Box sx={processNumber}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <PageTitle
                title="Total Processes Passed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="80%" styles={{ ...totalTitle }} />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="Total Processes Failed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="20%" styles={{ ...totalTitle }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <PageTitle title="Process Run" styles={{ ...totalTitle }} />
      {eodResponse?.data && eodResponse.data.length > 0 && (
        <Box sx={processRunningStyle}>
          {eodResponse.data.map((task, index) => (
            <Box key={index} sx={{ marginTop: '8px' }}>
              <Typography>
                <strong>Task Name:</strong> {task.taskName}
              </Typography>
              <Typography>
                <strong>Message:</strong> {task.message}
              </Typography>
              <Typography>
                <strong>Run Date:</strong> {task.runDate}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
