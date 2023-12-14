'use client';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';
import { TableSingleAction } from '@/components/Table';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { shortcards } from './style';
import { TextInput } from '@/components/FormikFields';
import SearchIcon from '@mui/icons-material/Search';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import {
  totalContainer,
  totalTitle,
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';

export const StatementAccount = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '80%' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Box sx={{ marginTop: '40px', marginBottom: '30px', marginLeft: '50px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box>
        <Box>
          <ShortCards
            title="CASA Accounts"
            numberOfAccounts="101,324 Accounts"
            link="/report/custom-report/statement-account/casa-account"
          />
        </Box>
        <Box>
          <ShortCards
            link="/report/custom-report/statement-account/casa-account"
            title="Term Deposit"
            numberOfAccounts="76,803 Accounts"
          />
        </Box>
        <Box>
          <ShortCards
            title="Loans"
            numberOfAccounts="3,054 Accounts"
            link="/report/custom-report/statement-account/casa-account"
          />
        </Box>
        <Box>
          <ShortCards
            title="General Ledgers"
            numberOfAccounts="21,683 Accounts"
            link="/report/custom-report/cheque-book"
          />
        </Box>
      </Box>
    </Box>
  );
};
