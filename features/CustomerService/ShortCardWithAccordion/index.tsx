'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  customerServiceReportsGroup,
  operationalReportsGroup,
} from '@/constants/Reports/groupReport';
import { ShortCardWithAccordion } from './ShortCardWithAccordion';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
    ,
  </Box>,
];
export const CreateCustomerContainer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px',
      }}
    >
      <TopActionsArea actionButtons={actionButtons} />
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <ShortCardWithAccordion
          cardTitle="Personal Details"
          titles="Personal Details"
        />
        <ShortCardWithAccordion
          cardTitle="Business/Office/School Details"
          titles="Business/Office/School Details"
        />
        <ShortCardWithAccordion
          cardTitle="Next of Kin Details"
          titles="Next of Kin Details"
        />
        <ShortCardWithAccordion
          cardTitle="Identification Details"
          titles="Identification Details"
        />
        <ShortCardWithAccordion
          cardTitle="Referrer’s Details"
          titles="Referrer’s Details"
        />
      </Box>
    </Box>
  );
};
