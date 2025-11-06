'use client';
import React, { useEffect, useState } from 'react';
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
import { FormSkeleton } from '@/components/Loaders';
import { Status } from '@/components/Labels';

interface IEodTask {
  taskid: number;
  taskname: string;
  status: string;
  retMsg?: string;
}

interface IEodMetrics {
  totalCompletedPercetage: number;
  totalUncompletedPercetage: number;
}

interface IEodException {
  taskName: string;
  message: string;
}

export const CreateEndOfDayForm = () => {
  const [tasks, setTasks] = useState<IEodTask[]>([]);
  const [metrics, setMetrics] = useState<IEodMetrics | null>(null);
  const [exceptions, setExceptions] = useState<IEodException[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Run ONLY on client after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      const taskDateRaw = localStorage.getItem('EOD_TASKS');
      const EodDataRaw = localStorage.getItem('EOD_METRICS');
      const ExceptionsDataRaw = localStorage.getItem('EOD_EXCEPTIONS');

      const parsedTasks = taskDateRaw ? JSON.parse(taskDateRaw) : [];
      const parsedMetrics = EodDataRaw ? JSON.parse(EodDataRaw) : null;
      const parsedExceptions = ExceptionsDataRaw
        ? JSON.parse(ExceptionsDataRaw)
        : [];

      setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
      setMetrics(parsedMetrics);
      setExceptions(Array.isArray(parsedExceptions) ? parsedExceptions : []);
    }
  }, []);

  // Show loading until client data is ready
  if (!isClient) {
    return <FormSkeleton noOfLoaders={3} />;
  }

  const totalPercentageCompleted =
    metrics?.totalCompletedPercetage?.toFixed(2) ?? '0';
  const totalPercentageUncompleted =
    metrics?.totalUncompletedPercetage?.toFixed(2) ?? '0';

  return (
    <Box sx={EndofDayContainerForm}>
      {/* Summary */}
      <Box sx={processPassingStyle}>
        <Box sx={processNumber}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <PageTitle
                title="Total Processes Passed"
                styles={totalProcesTitle}
              />
              <PageTitle
                title={`${totalPercentageCompleted}%`}
                styles={totalTitle}
              />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="Total Processes Failed"
                styles={totalProcesTitle}
              />
              <PageTitle
                title={`${totalPercentageUncompleted}%`}
                styles={totalTitle}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <PageTitle title="Process Run" styles={{ ...totalTitle, mb: 2 }} />

      {/* Table */}
      {tasks.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
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
              {tasks.map((task, index) => (
                <TableRow key={task.taskid || index}>
                  <TableCell>{task.taskid}</TableCell>
                  <TableCell>{task.taskname}</TableCell>
                  <TableCell>
                    <Status
                      label={task.status === '0' ? 'Success' : 'Failed'}
                      status={task.status === '0' ? 'success' : 'warning'}
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

      {/* Exceptions */}
      <PageTitle
        title="EOD Exceptions"
        styles={{ ...totalTitle, mt: 4, mb: 2 }}
      />

      {exceptions.length > 0 ? (
        <Box>
          {exceptions.map((ex, i) => (
            <Box
              key={i}
              p={2}
              bgcolor="error.light"
              borderRadius={1}
              mb={1}
              color="white"
            >
              <strong>{ex.taskName}</strong>: {ex.message}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No exceptions reported.
        </Typography>
      )}
    </Box>
  );
};
