'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from '@/features/Report/CustomReport/OutFlowReport/FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import MOCK_DATA from '@/constants/MOCK_DATAv2.json';

export const HoldingTransactions = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection />
        </Box>
        <TableV2
          tableConfig={{
            hasActions: false,
            paintedColumns: ['DR Product Balance', ''],
            totalRow: ['Total Amount in Holding', '', '₦104,200.65', '']
          }}
          columns={MOCK_COLUMNS_V2}
          data={MOCK_DATA}
          hideFilterSection
          showHeader={{
            mainTitle: 'Holding Transactions',
            secondaryTitle:
              'See a directory of all holding transactions in this system.'
          }}
        />
      </Box>
    </Box>
  );
};
