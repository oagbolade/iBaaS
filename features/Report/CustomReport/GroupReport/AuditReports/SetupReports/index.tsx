'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MiniCard } from '@/features/Report/CustomReport/GroupReport/MiniCard';
import { setupReports } from '@/constants/Reports/groupReport';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

export const SetupReports = () => {
  return (
    <Box
      sx={{
        marginTop: '50px',
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '0 25px',
        }}
      >
        <FilterSection />
        <Grid container spacing={2}>
          {setupReports.map((report) => (
            <MiniCard reportName={report.reportName} link={report.link} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
