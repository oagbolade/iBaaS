import React from 'react';
import { Box } from '@mui/material';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { HeaderI } from '@/components/Table/Table';

export const SharedView = ({
  mainTitle,
  secondaryTitle,
  filterSection
}: HeaderI) => {
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
          padding: '0 25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginBottom: '30px' }}>{filterSection}</Box>
        <MuiTableContainer
          tableConfig={{
            hasActions: false
          }}
          showHeader={{
            mainTitle,
            secondaryTitle
          }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          hideFilterSection
        />
      </Box>
    </Box>
  );
};
