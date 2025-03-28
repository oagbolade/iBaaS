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
              description="Process funds transfers within the same bank"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/NIPTransfer"
              title="NIP Transfer"
              description="Process Interbank transfers connected through NIBBS"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/posting"
              title="Batch Posting"
              description="Process multiple related funds transfer"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/bulkUpload"
              title="Bulk Upload"
              description="Process and automate voluminous cash transactions with a guided template"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
