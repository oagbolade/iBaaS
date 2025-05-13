'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { GrandTotal, ShortCardWithAccordion } from './ShortCardWithAccordion';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { column, data } from '@/constants/Reports/ASSETS_DATA';
import { FilterSection } from './FilterSection';
import { useGetBranches } from '@/api/general/useBranches';

export const BalanceSheet = () => {
  const { branches } = useGetBranches();

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '70px',
      }}
    >
      <TopOverViewSection useBackButton />
      <Box>{branches && <FilterSection branches={branches} />}</Box>
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <ShortCardWithAccordion column={column} data={data} />
        <GrandTotal title="Grand Total" amount={'56679805321.54'} />
      </Box>
    </Box>
  );
};
