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
import {
  useCreateRunEOD,
  useGetEODProcesses,
  useGetEODProcesslog,
  useGetEODResult
} from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';
import { Status } from '@/components/Labels';

export const CreateEndOfDayForm = () => {
  const { data, isLoading } = useGetEODProcesses();
  if (isLoading) {
    return <FormSkeleton noOfLoaders={3} />;
  }
  const totalPercetageUncompleted =
    data?.find((item) => item.totalUncompletedPercetage) || 0;
  const totalPercetagecompleted =
    data?.find((item) => item.totalPercetagecompleted) || 0;
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
              <PageTitle
                title={totalPercetageUncompleted?.toString()}
                styles={{ ...totalTitle }}
              />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="Total Processes Failed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle
                title={totalPercetagecompleted?.toString()}
                styles={{ ...totalTitle }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <PageTitle title="Process Run" styles={{ ...totalTitle }} />
      {data && data.length > 0 && (
        <Box sx={processRunningStyle}>
          {data.map((task, index) => (
            <Box
              key={index}
              sx={{
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ marginRight: '6px' }}>
                <Typography>
                  <strong>Task Name:</strong>
                  {task.taskid}{' '}
                </Typography>
              </Typography>
              <Typography>
                <Typography sx={{ marginRight: '70px' }}>
                  <strong>Message:</strong> {task.taskname}
                </Typography>
              </Typography>
              <Typography sx={{ display: 'flex', marginRight: '56px' }}>
                <strong>Status:</strong>
                <Status
                  label={Number(task?.taskStatus) === 0 ? 'success' : 'Fail'}
                  status={
                    Number(task?.taskStatus) === 0 ? 'success' : 'warning'
                  }
                />
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
