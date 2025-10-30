'use client';
import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import {
  EndofDayContainerForm,
  processNumber,
  processPassingStyle,
  totalProcesTitle,
  totalTitle
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  useCreateRunEOD,
  useGetEODProcesses
} from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';
import { Status } from '@/components/Labels';

export const CreateEndOfDayForm = () => {
  const { data, isLoading, eobException, eodMetrics } = useGetEODProcesses();
  const { mutate, isPending, data: process } = useCreateRunEOD();
  console.log(process);
  if (isLoading) {
    return <FormSkeleton noOfLoaders={3} />;
  }

  const totalPercentageUncompleted =
    data?.find((item) => item.totalUncompletedPercentage) || 0;
  const totalPercentageCompleted =
    data?.find((item) => item.totalPercentageCompleted) || 0;

  return (
    <Box sx={EndofDayContainerForm}>
      <Box sx={processPassingStyle}>
        <Box sx={processNumber}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <PageTitle
                title="Total Processes Passed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle
                title={totalPercentageCompleted?.toString()}
                styles={{ ...totalTitle }}
              />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="Total Processes Failed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle
                title={totalPercentageUncompleted?.toString()}
                styles={{ ...totalTitle }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <PageTitle title="Process Run" styles={{ ...totalTitle, mb: 2 }} />

      {data && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="process run table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Task ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Task Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskid}</TableCell>
                  <TableCell>{task.taskname}</TableCell>
                  <TableCell>
                    <Status
                      label={
                        Number(task?.taskStatus) === 0 ? 'Success' : 'Fail'
                      }
                      status={
                        Number(task?.taskStatus) === 0 ? 'success' : 'warning'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No processes available</Typography>
      )}
    </Box>
  );
};
