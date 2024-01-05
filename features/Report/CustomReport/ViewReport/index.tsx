'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { ViewReports } from '@/components/ViewReport/ViewReports';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { useSearchParams } from 'next/navigation';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

const accountInfos = [
  { title: 'Account Name', figure: 'N2,000,000', name: 'John' },
];

export const ViewAccountEnquiry = () => {
  const searchParams = useSearchParams();
  const showReportTable = searchParams.get('showTableReport');

  return (
    <Box>
      <Box sx={{ width: '100%', marginTop: '50px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Stack direction="row">
        <ViewReports accountIfo={accountInfos} />
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
