'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import MOCK_DATA from '@/constants/MOCK_DATAv2.json';
import colors from '@/assets/colors';

const ViewMore = (): React.ReactNode => {
  return (
    <Link href="/reports">
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
          color: `${colors.activeBlue400}`,
          cursor: 'pointer'
        }}
      >
        View More
      </Typography>
    </Link>
  );
};
export const RunningLoans = () => {
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
            hasActions: true,
            paintedColumns: ['CR Product Balalnce', 'DR Product Balance'],
            totalRow: [
              'Total',
              '',
              '157.00',
              'N10,856,917.78',
              '-N4,550,372.0',
              'N6,306,545.78',
              ''
            ],
            grandTotalRow: ['Balance', '', '', '', '', 'N405,321.54', '']
          }}
          columns={MOCK_COLUMNS_V2}
          data={MOCK_DATA}
          ActionMenuProps={ViewMore}
          hideFilterSection
          showHeader={{
            mainTitle: 'Loan listing by account officer’s report',
            secondaryTitle:
              'See a directory of all Running Loans in this system.'
          }}
        />
      </Box>
    </Box>
  );
};
