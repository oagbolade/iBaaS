'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { PortfolioCard } from './PortfolioCards';
import { TextInput } from '@/components/FormikFields';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { Portfolio } from '@/constants/Reports/portfolio';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

export const PortfolioAtRisk = () => {
  return (
    <Box>
      <Box sx={{ width: '1300px', marginTop: '50px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Box sx={{ marginTop: '30px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Box>
          <PortfolioCard
            PortfolioOption={Portfolio.ShortItem}
            link="/report/custom-report/portfolio-risk/individual-loan"
          />
        </Box>
        <Box>
          <PortfolioCard
            PortfolioOption={Portfolio.ThriveLoan}
            link="/report/custom-report/portfolio-risk/individual-loan"
          />
        </Box>
        <Box>
          <PortfolioCard
            PortfolioOption={Portfolio.MSFLoan}
            link="/report/custom-report/portfolio-risk/individual-loan"
          />
        </Box>
        <Box>
          <PortfolioCard
            PortfolioOption={Portfolio.AgriculturualLoan}
            link="/report/custom-report/portfolio-risk/individual-loan"
          />
        </Box>
      </Box>
    </Box>
  );
};
