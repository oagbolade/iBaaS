'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CreateEndOfDayForm } from '../../Forms/CreateEndofdayForm';
import { TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const EndOfDayContainer = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [firstTask, setFirstTask] = useState<any>(null);

  // Run ONLY on client after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const taskDateRaw = localStorage?.getItem('EOD_TASKS');
      const parsedTasks = taskDateRaw ? JSON.parse(taskDateRaw) : [];
      setTasks(parsedTasks);
      const task = parsedTasks.find((item: any) => item?.taskid != null);
      setFirstTask(task);
    }
  }, []);

  const actionButtons = firstTask ? (
    <Box
      sx={{ display: 'flex' }}
      ml={{ mobile: 2, desktop: 0 }}
      key="view-details"
    >
      <Link
        href={`/setup/product-gl/view-eod-process/?isEditing=true&id=${firstTask.taskid}`}
        passHref
      >
        <TableSingleAction actionName="View Details" />
      </Link>
    </Box>
  ) : null;

  return (
    <>
      {/* Top Fixed Action Bar */}
      <Box
        sx={{
          marginTop: '60px',
          position: 'fixed',
          top: 0,
          width: 'calc(100vw - 300px)',
          zIndex: 1,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <TopActionsArea actionButtons={actionButtons ? [actionButtons] : []} />
      </Box>

      {/* Main Content */}
      <CreateEndOfDayForm />
    </>
  );
};
