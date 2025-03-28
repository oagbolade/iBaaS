'use client';
import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  cardsDetailsContainer,
  customReportContainer
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';

export const OperationsContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Commercial Banks"
              link="/setup/operations/commercial_bank"
              description="Setup commercial banks on application"
            />
          </Box>
          {/* On hold */}
          {/* <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/operations/reset-password"
              title="Reset Password"
              description="Enable proactive risk management by monitoring account within a financial institution that have incurred overdraft"
            />
          </Box> */}
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/operations/cheque-book"
              title="Cheque"
              description="Manage different cheque book types"
            />
          </Box>
          {/* On hold */}
          {/* <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/operations/sbu"
              title="SBU"
              description="Enable proactive risk management by monitoring account within a financial institution that have incurred overdraft"
            />
          </Box> */}
          {/* On hold */}
          {/* 
             <Box mb={{ mobile: 2, desktop: 0 }}>
              <CustomCardsReports
                link="/setup/operations/transaction-type"
                title="Transaction Type"
                description="Configure transaction types and their corresponding charges"
              />
            </Box>
           */}
          {/* On hold */}
          {/* <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Interests"
              description="View the TD maturity report to track the maturity dates of the Time deposit account and manage the corresponding action"
            />
          </Box> */}
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/operations/clearing-banks"
              title="Clearing Banks"
              description="Setup and manage clearing banks for cheque operaions"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/operations/dormancy-criteria"
              title="Dormancy Criteria"
              description="Configure the conditions that render various products inactive"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
