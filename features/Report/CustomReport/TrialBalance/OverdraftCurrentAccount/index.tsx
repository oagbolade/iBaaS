'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from '@/features/Report/CustomReport/OutFlowReport/FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import MOCK_DATA from '@/constants/MOCK_DATAv2.json';

export const OverdraftCurrentAccount = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px',
      }}
    >
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>{' '}
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection />
        </Box>
        <TableV2
          tableConfig={{
            hasActions: false,
            paintedColumns: ['DR Product Balance', 'Total Balance'],
            totalRow: ['Total Amount', '', '₦104,200.65', '₦321,654.65', ''],
          }}
          columns={MOCK_COLUMNS_V2}
          data={MOCK_DATA}
          hideFilterSection
          showHeader={{
            mainTitle: 'Overdraft facilities current account',
            secondaryTitle:
              'See a directory of all Overdraft facilities current account Report in this system.',
          }}
        />
      </Box>
    </Box>
  );
};
