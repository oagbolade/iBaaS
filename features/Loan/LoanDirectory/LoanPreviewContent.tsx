'use client';
import React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import {
  Details,
  MainTitle,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

interface LoanPreviewContentProps {
  isLoadingLoanData: boolean | undefined;
  data?: any;
}

const LoanPreviewContent: React.FC<LoanPreviewContentProps> = ({
  isLoadingLoanData,
  data
}) => {
  if (isLoadingLoanData) {
    return (
      <Box>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box
      mt={{ mobile: 0, desktop: 3 }}
      sx={{
        padding: { mobile: '0 30px', tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <MainTitle title="Loan Account Details" />
      <SubTitle title="Settlement Account" />
      <Details title={data?.settlementAcct || 'N/A'} />
      <SubTitle title="Settlement Account Name" />
      <Details title={data?.fullName || 'N/A'} />
      <SubTitle title="Loan Product" />
      <Details title={data?.productName || 'N/A'} />
      <SubTitle title="Branch" />
      <Details title={data?.branchName || 'N/A'} />
      <SubTitle title="Loan Amount" />
      <Details
        title={`NGN ${formatCurrency(data?.loanAmount || 0) || 'N/A'}`}
      />
      <SubTitle title="Current Customer Balance" />
      <Details title={`NGN ${data?.currentbalance || 'N/A'}`} />
      <SubTitle title="Loan Term" />
      <Details title={data?.loanTerm?.toString() || 'N/A'} />
      <SubTitle title="Loan Rate" />
      <Details title={data?.intRate?.toString() || 'N/A'} />
      <SubTitle title="Repayment Type" />
      <Details title={data?.repaymentType?.toString() || 'N/A'} />
      <SubTitle title="Calculation Method" />
      <Details title={data?.calculationName?.toString() || 'N/A'} />
      <SubTitle title=" Start Date" />
      <Details
        title={
          data?.startdate
            ? moment(data.startdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />
      <SubTitle title="Maturity" />
      <Details
        title={
          data?.matdate
            ? moment(data.matdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label={data?.status} status="" />
      </Box>
    </Box>
  );
};

export default LoanPreviewContent;
