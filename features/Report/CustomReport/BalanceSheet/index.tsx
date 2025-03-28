'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { ShortCardWithAccordion } from './ShortCardWithAccordion';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { column, data } from '@/constants/Reports/ASSETS_DATA';

export const BalanceSheet = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '70px'
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
      </Box>
    </Box>
  );
};
