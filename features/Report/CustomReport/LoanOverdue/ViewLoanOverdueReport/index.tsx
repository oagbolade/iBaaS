'use client';
import React, { useContext } from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { ViewReports } from './ViewReports';
import { TopOverViewSection } from './TopOverViewSection';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { ReportModuleContext } from '@/context/ReportModuleContext';

export const ViewLoanReport = () => {
  const { loanOverdueStateData } = useContext(ReportModuleContext);

  const searchParams = useSearchParams();
  const showReportTable = searchParams.get('showTableReport');

  return (
    <Box>
      <Box sx={{ width: '100%', marginTop: '50px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Stack direction="row">
        <ViewReports loanOverdueData={loanOverdueStateData} />
      </Stack>
      {showReportTable && (
        <Box sx={{ padding: '25px', width: '100%' }}>
          <MuiTableContainer
            tableConfig={{ hasActions: false }}
            columns={MOCK_COLUMNS}
            data={MOCK_DATA}
            showSearch
          />
        </Box>
      )}
    </Box>
  );
};
