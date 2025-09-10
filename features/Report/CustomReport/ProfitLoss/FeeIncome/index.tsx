'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from '@/features/Report/CustomReport/OutFlowReport/FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import MOCK_DATA from '@/constants/MOCK_DATAv2.json';

export const FeeIncome = () => {
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
          <FilterSection onSearch={() => {}} />
        </Box>
        <TableV2
          tableConfig={{
            hasActions: false,
            paintedColumns: ['DR Product Balance', 'Total Balance'],
            totalRow: ['Total Amount', '', '₦104,200.65', '₦321,654.65', '']
          }}
          columns={MOCK_COLUMNS_V2}
          data={MOCK_DATA}
          hideFilterSection
          showHeader={{
            mainTitle: 'Fee Income - Loans',
            secondaryTitle:
              'See a directory of all Fee Income - Loans Report in this system.'
          }}
        />
      </Box>
    </Box>
  );
};
