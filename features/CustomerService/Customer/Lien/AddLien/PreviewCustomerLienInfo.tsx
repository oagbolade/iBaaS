'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import { title as titleStyle } from '@/features/Operation/Forms/style';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type Props = {
  loading?: boolean;
  accountInfo?: IAccountDetailsResults;
};

export const PreviewCustomerLienInfo = ({ accountInfo, loading }: Props) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '100%'
      }}
    >
      {loading && <FormSkeleton noOfLoaders={5} />}
      {accountInfo && (
        <PageTitle title="Account Information" styles={titleStyle} />
      )}
      {accountInfo ? (
        <>
          <SubTitle title="CASA Account Name" />
          <Details title={accountInfo?.accounttitle || 'N/A'} />

          <SubTitle title="Account Balance" />
          <Details
            title={`NGN ${formatCurrency(
              (accountInfo?.usebal || 0).toString()
            )}`}
          />
          <SubTitle title="Existing Lien" />
          <Details
            title={`NGN ${formatCurrency(
              (accountInfo?.holdBal || 0).toString()
            )}`}
          />
          <SubTitle title="Product Name" />
          <Details title={accountInfo?.prodname || 'N/A'} />
        </>
      ) : (
        <NoDataAvailable
          width={100}
          height={100}
          message="No customer account Information available"
        />
      )}
    </Box>
  );
};
