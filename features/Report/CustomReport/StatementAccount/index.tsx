'use client';
import { Box } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '@/components/FormikFields';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { shortCardsTitle } from './style';

export const StatementAccount = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '40px', marginBottom: '30px', marginLeft: '50px' }}>
        <TextInput
          name="Search"
          placeholder="Search"
          icon={<SearchIcon />}
          customStyle={{ ...shortCardsTitle }}
        />
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
