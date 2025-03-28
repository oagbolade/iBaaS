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
import { useGetLoanAccountByLoanAccountNumber } from '@/api/loans/useCreditFacility';
import { encryptData } from '@/utils/encryptData';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

interface LoanPreviewContentProps {
  accountNumber: string;
  data?: any;
}

const LoanPreviewContent: React.FC<LoanPreviewContentProps> = ({
  accountNumber,
  data
}) => {
  const { data: loanData, isLoading: isLoanDetailsLoading } =
    useGetLoanAccountByLoanAccountNumber(
      encryptData(accountNumber as string) || ''
    );

  const loanDetails = data || loanData;
  if (isLoanDetailsLoading) {
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
      <Details title={loanDetails?.settlementacct1 || 'N/A'} />
      <SubTitle title="Settlement Account Name" />
      <Details title={loanDetails?.fullname || 'N/A'} />
      <SubTitle title="Loan Product" />
      <Details title={loanDetails?.productname || 'N/A'} />
      <SubTitle title="Branch" />
      <Details title={loanDetails?.branchName || 'N/A'} />
      <SubTitle title="Loan Amount" />
      <Details
        title={`NGN ${formatCurrency(loanDetails?.loanamount || 0) || 'N/A'}`}
      />
      <SubTitle title="Current Customer Balance" />
      <Details title={`NGN ${loanDetails?.settlementAcctBal || 'N/A'}`} />
      <SubTitle title="Loan Term" />
      <Details title={loanDetails?.loanterm?.toString() || 'N/A'} />
      <SubTitle title="Loan Rate" />
      <Details title={loanDetails?.intrate?.toString() || 'N/A'} />
      <SubTitle title="Repayment Type" />
      <Details title={loanDetails?.repaydesc?.toString() || 'N/A'} />
      <SubTitle title="Calculation Method" />
      <Details title={loanDetails?.loanschedcalcdesc?.toString() || 'N/A'} />
      <SubTitle title=" Start Date" />
      <Details
        title={
          loanDetails?.startdate
            ? moment(loanDetails.startdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />
      <SubTitle title="Maturity" />
      <Details
        title={
          loanDetails?.matdate
            ? moment(loanDetails.matdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status
          label={loanDetails?.status === '4' ? 'Active' : 'Matured'}
          status={loanDetails?.status === '4' ? 'success' : 'matured'}
        />
      </Box>
    </Box>
  );
};

export default LoanPreviewContent;
