'use client';
import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  cardsDetailsContainer,
  customReportContainer,
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';
import { TextInput } from '@/components/FormikFields';

export const TransferContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Funds Transfer"
              link="/operation/fundsTransfer"
              description="Enable proactive risk management by monitoring account within a financial institution that have incurred overdraft"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/NIPTransfer"
              title="NIP Transfer"
              description="View the TD maturity report to track the maturity dates of the Time deposit account and manage the corresponding action"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/posting"
              title="Batch Posting"
              description="Detailed overview of the current status and details of active loans"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/bulkUpload"
              title="Bulk Upload"
              description="Enable proactive risk management by monitoring account within a financial institution that have incurred overdraft"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
