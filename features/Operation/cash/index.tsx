'use client';
import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  cardsDetailsContainer,
  customReportContainer
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';
import { TextInput } from '@/components/FormikFields';

export const CashContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      {/* <Box sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput
          name="Search"
          placeholder="Search"
          icon={<SearchIcon />}
          customStyle={{ width: '90%' }}
        />
      </Box> */}
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Cash Deposit"
              link="/operation/deposit"
              description="Process over the counter cash deposits requests"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/withdrawal"
              title="Cash Withdrawal"
              description="Process over the counter cash withdrawal requests"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/cashJournal"
              title="Cash Journal"
              description="View the status of Till Balance, Records of daily internal cash, cash inflow & outflows"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/posting"
              title="Batch Posting"
              description="Process multiple related cash transactions"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/bulkUpload"
              title="Bulk Upload"
              description="Process and automate voluminous cash transactions with a guided template"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Charge Concession"
              description="Effect concession on customer account"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
