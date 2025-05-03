'use client';
import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { Tabs } from '@/components/Revamp/Tabs';
import { inputText } from '@/features/CustomerService/Form/style';
import { FormSkeleton } from '@/components/Loaders';
import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type AccountInformationProp = {
  accDetailsResults?: IAccountDetailsResults;
};

export const AccountInformation = ({
  accDetailsResults
}: AccountInformationProp) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Account Name" />
      <Details title={accDetailsResults?.accounttitle || 'N/A'} />

      <SubTitle title="Product Name" />
      <Details title={accDetailsResults?.prodname || 'N/A'} />

      <SubTitle title="Head Office" />
      <Details title={accDetailsResults?.branch || 'N/A'} />

      <SubTitle title="Account Number" />
      <Details title={accDetailsResults?.accountnumber || 'N/A'} />

      <SubTitle title="Book Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.bkbal || 0) || 'N/A'}`}
      />

      <SubTitle title="Effective Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.effbal || 0) || 'N/A'}`}
      />

      <SubTitle title="Usable Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.usebal || 0) || 'N/A'}`}
      />

      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Account Status" />
        <Status
          label={accDetailsResults?.acctstatus ? 'Active' : 'Dormant'}
          status={accDetailsResults?.acctstatus ? 'success' : 'warning'}
        />
      </Box>
    </Box>
  );
};

type ActiveLoanInformationProp = {
  loanAccDetails?: ILoanAccountDetails;
};

export const ActiveLoanInformation = ({
  loanAccDetails
}: ActiveLoanInformationProp) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Product Name" />
      <Details title={loanAccDetails?.productCode || 'N/A'} />

      <SubTitle title="Start Date" />
      <Details
        title={
          moment(loanAccDetails?.startdate).format('MMMM Do YYYY') || 'N/A'
        }
      />

      <SubTitle title="Mature Date" />
      <Details
        title={moment(loanAccDetails?.matdate).format('MMMM Do YYYY') || 'N/A'}
      />

      {/* Cannot find commented out sections being returned from the API
        May need to revert to infosight */}
      {/* <SubTitle title="Group Name" />
      <Details title={loanAccDetails?.accountnumber || 'N/A'} /> */}

      <SubTitle title="Interest Rate" />
      <Details
        title={`NGN ${formatCurrency(loanAccDetails?.intRate || 0) || 'N/A'}`}
      />
      {/* 
      <SubTitle title="Currency" />
      <Details title={`NGN ${loanAccDetails?.effbal || 'N/A'}`} /> */}

      <SubTitle title="Loan Amount" />
      <Details
        title={`NGN ${
          formatCurrency(loanAccDetails?.loanAmount || 0) || 'N/A'
        }`}
      />

      <SubTitle title="Current Balance" />
      <Details
        title={`NGN ${
          formatCurrency(loanAccDetails?.currentbalance || 0) || 'N/A'
        }`}
      />

      <SubTitle title="Outstanding Interest" />
      <Details
        title={`NGN ${
          formatCurrency(loanAccDetails?.out_Interest || 0) || 'N/A'
        }`}
      />

      {/* <SubTitle title="Monthly Interest" />
      <Details title={`NGN ${loanAccDetails?. || 'N/A'}`} /> */}

      <SubTitle title="Last Date Accured" />
      <Details
        title={
          moment(loanAccDetails?.totaldays).format('MMMM Do YYYY') || 'N/A'
        }
      />
    </Box>
  );
};

const tabTitle = ['Account Information', 'Active Loan  Information'];

type PreviewAccountInfoProp = {
  loading?: boolean;
  accDetailsResults?: IAccountDetailsResults;
  loanAccDetails?: ILoanAccountDetails;
};

export const PreviewAccountInfo = ({
  loading,
  accDetailsResults,
  loanAccDetails
}: PreviewAccountInfoProp) => {
  if (loading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        tabTitle={tabTitle}
        pageMenu={[
          <AccountInformation accDetailsResults={accDetailsResults} />,
          <ActiveLoanInformation loanAccDetails={loanAccDetails} />
        ]}
        customStyle={{ ...inputText }}
      />
    </Box>
  );
};
