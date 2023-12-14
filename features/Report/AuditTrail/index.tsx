'use client';
import { Box } from '@mui/material';
import React from 'react';
import { FilterSection } from './FilterSection';
import { ViewAuditLog } from './ViewAuditLog';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';

export const AuditTrail = () => {
  const ActionMenu: React.FC = () => {
    return <ViewAuditLog />;
  };
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px',
      }}
    >
      <FilterSection />
      <Box sx={{ marginTop: '40px' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
