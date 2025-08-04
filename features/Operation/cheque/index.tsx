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

export const ChequeContainer = () => {
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
              title="Cheque Deposit"
              link="/operation/chequesDeposit"
              description="Process Internal cheques to be credited into a customer account"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/chequeWithdrawal"
              title="Cheque Withdrawal"
              description="Process Internal cheques to be withdrawn from customer account for payout"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/reversal"
              title="Return Cheque Reversal"
              description="Manage reversal of returned cheques
              "
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/clear"
              title="Inward Clearing"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/unclear"
              title="Outward Clearing"
              description="Process cheque presented from another bank for payment"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
