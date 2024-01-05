'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import MOCK_DATA from '@/constants/MOCK_DATAv2.json';

export const PlainTrialBalance = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px',
      }}
    >
      <TopOverViewSection useBackButton />
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
            totalRow: [
              'Total Amount',
              '',
              '157.00',
              'N10,856,917.78',
              '-N4,550,372.0',
              'N6,306,545.78',
              '',
            ],
            grandTotalRow: [
              'Balance in Book',
              '',
              '',
              '',
              '',
              'N405,321.54',
              '',
            ],
          }}
          columns={MOCK_COLUMNS_V2}
          data={MOCK_DATA}
          hideFilterSection
          showHeader={{
            mainTitle: 'Plain Trial Balance',
            secondaryTitle:
              'See a directory of all Plain Trial Balance this system.',
          }}
        />
      </Box>
    </Box>
  );
};
