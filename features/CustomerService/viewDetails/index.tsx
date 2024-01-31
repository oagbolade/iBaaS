'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  customerServiceReportsGroup,
  operationalReportsGroup,
} from '@/constants/Reports/groupReport';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { ShortCardWithViewDetailsAccordion } from './ShortCardViewDetails';
import { viewCustomerService } from '@/constants/CustomerService/viewCustomerDetails';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
    ,
  </Box>,
];
export const ViewDetailContainer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px',
      }}
    >
      <TopActionsArea />
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <ShortCardWithViewDetailsAccordion
          cardTitle="Personal Details"
          titleName="Personal Details"
          accountInfo={viewCustomerService}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Business/Office/School Details"
          titleName="Business/Office/School Details"
          accountInfo={viewCustomerService}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Next of Kin Details"
          titleName="Next of Kin Details"
          accountInfo={viewCustomerService}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Identification Details"
          titleName="Identification Details"
          accountInfo={viewCustomerService}
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Referrer’s Details"
          titleName="Referrer’s Details"
          accountInfo={viewCustomerService}
        />
      </Box>
    </Box>
  );
};
