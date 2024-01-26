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

export const LoanContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Collection"
              link="/operation/collection"
              description="Optimize your financial transactions effortlessly, ensuring streamlined processing and enhanced clarity in transaction records."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/disbursement"
              title="Disbursement"
              description="Seal the deal confidently, ensuring a smooth and secure release of funds for your financial milestones."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
