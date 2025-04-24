'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import { title as titleStyle } from '@/features/Operation/Forms/style';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  ILienAccountName,
  ILienDetail,
  ILienExists,
  ILienModel
} from '@/api/ResponseTypes/customer-service';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type Props = {
  loading?: boolean;
  liendetail?: ILienDetail[];
  accName?: ILienAccountName;
  lienexist?: ILienExists;
  lienModel?: ILienModel;
};

export const PreviewCustomerReleaseLienInfo = ({
  liendetail,
  accName,
  lienexist,
  lienModel,
  loading
}: Props) => {
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
      {liendetail && (
        <PageTitle title="Account Information" styles={titleStyle} />
      )}
      {liendetail ? (
        <>
          <SubTitle title="CASA Account Name" />
          <Details title={accName?.accounttitle || 'N/A'} />

          <SubTitle title="Account Balance" />
          <Details
            title={`NGN ${formatCurrency(
              (lienModel?.bkbalance || 0).toString()
            )}`}
          />

          <SubTitle title="Existing Lien" />
          <Details
            title={`NGN ${formatCurrency(
              (lienexist?.lienexist || 0).toString()
            )}`}
          />

          <SubTitle title="Interest Accured" />
          <Details
            title={`NGN ${formatCurrency(
              (lienModel?.intaccrued || 0).toString()
            )}`}
          />
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
