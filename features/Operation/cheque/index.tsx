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

export const ChequeContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '20px' }}>
        <TextInput name="Search" placeholder="Search" icon={<SearchIcon />} />
      </Box>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Cheque Deposit"
              link="/operation/chequesDeposit"
              description="Streamline your financial transactions effortlessly, providing you with a secure and efficient way to manage your funds online."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/chequeWithdrawal"
              title="Cheque Withdrawal"
              description="Access your funds with ease! ensuring quick and secure transactions for your convenience."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/reversal"
              title="Return Cheque Reversal"
              description="Experience swift resolution as we process your return cheque reversal promptly, ensuring seamless financial transactions."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/clear"
              title="Inward Clearing"
              description="Unlock unparalleled convenience with effortless transactions guaranteed, ensuring a seamless and swift flow of funds."
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/operation/unclear"
              title="Outward Clearing"
              description="Seamless financial transactions at your fingertips, ensuring a smooth and secure flow of funds for your complete peace of mind."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
