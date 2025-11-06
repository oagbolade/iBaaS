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

export const TreasuryContainer = () => {
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
              title="Create Deposit Account"
              link="/operation/deposit"
              description="Process Internal cheques to be credited into a customer account"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/withdrawal"
              title="Deposit Redemption"
              description="Process Internal cheques to be withdrawn from customer account for payout"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/cashJournal"
              title="TD Cancellation"
              description="Manage reversal of returned cheques"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/posting"
              title="TD Rollover"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/bulkUpload"
              title="TD Payout"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="TD Partial Payoff"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Principal Deposit"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Deal Certificate"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Book Takings"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Rollover Takings"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Liquidate Takings"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Payout Takings"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Book Placements"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Liquidate Placements"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Payout Takings"
              description="Process cheque presented to another bank to request value of payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/concession"
              title="Rollover Placements"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
