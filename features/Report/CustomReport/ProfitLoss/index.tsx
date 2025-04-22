'use client';
import React from 'react';
import { Box } from '@mui/material';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import {
  totalContainer,
  totalTitle
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import { FilterSection } from '@/features/Report/CustomReport/TrialBalance/FilterSection';

export const ProfitLoss = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '40px', marginBottom: '30px', marginLeft: '50px' }}>
        <FilterSection />
      </Box>
      <Box>
        <Box>
          <ShortCards
            title="Interest Income - Loans"
            numberOfAccounts="₦321,654.65 Balance"
            link="/report/custom-report/profit-loss/interest-income"
          />
        </Box>
        <Box>
          <ShortCards
            link="/report/custom-report/profit-loss/interest-income"
            title="Penalty Income"
            numberOfAccounts="₦321,654.65 Balance"
          />
        </Box>
        <Box>
          <ShortCards
            title="Fee Income - Loans"
            numberOfAccounts="₦321,654.65 Balance"
            link="/report/custom-report/profit-loss/fee-income"
          />
        </Box>
        <Box sx={totalContainer}>
          <PageTitle title="Total Asset" styles={{ ...totalTitle }} />
          <Box sx={{ paddingLeft: '74%' }}>
            <PageTitle title="₦405,321.54" styles={{ ...totalTitle }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
