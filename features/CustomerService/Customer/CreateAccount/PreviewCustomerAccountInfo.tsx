'use client';
import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import { title as titleStyle } from '@/features/Operation/Forms/style';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { IAccountInfo } from '@/api/ResponseTypes/customer-service';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { FormSkeleton } from '@/components/Loaders';

export const PreviewCustomerAccountInfo = ({
  accountInfo,
  loading
}: {
  accountInfo: IAccountInfo;
  loading: boolean;
}) => {
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
          <SubTitle title="Title" />
          <Details title={accountInfo.title} />

          <SubTitle title="Full Name" />
          <Details title={accountInfo.fullname} />

          <SubTitle title="Date of Birth" />
          <Details title={moment(accountInfo.dob).format('MMMM Do YYYY')} />

          <SubTitle title="Gender" />
          <Details title={accountInfo.gender === '1' ? 'Male' : 'Female'} />

          <SubTitle title="BVN" />
          <Details title={accountInfo.bvn || 'N/A'} />

          <SubTitle title="Email Address" />
          <Details title={accountInfo.email || 'N/A'} />
        </>
      ) : (
        <NoDataAvailable
          width={100}
          height={100}
          message="No customer account Information, please select a customer"
        />
      )}
    </Box>
  );
};
