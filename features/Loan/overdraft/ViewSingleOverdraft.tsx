'use client';
import React from 'react';
import moment from 'moment';
import { Box, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { subTitleStyles, detailStyle } from './styles';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { Status } from '@/components/Labels';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';

export const SubTitle = ({ title }: { title: string }) => {
  return <Typography sx={subTitleStyles}>{title}</Typography>;
};

export const Details = ({ title }: { title: string }) => {
  return <Typography sx={detailStyle}>{title}</Typography>;
};

const actionButtons: any = [
  <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
    <PrimaryIconButton
      type="submit"
      buttonTitle="Set Overdraft"
      customStyle={{ ...submitButton }}
    />
  </Box>
];

const ViewSingleOverDraftDetails = () => {
  const { setDirection } = useSetDirection();
  const searchParams = useSearchParams();
  const detail = searchParams.get('odDetail') || '';
  const odAccDetails = JSON.parse(detail);

  return (
    <Box>
      <TopActionsArea customStyle={{ padding: '24px' }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          margin: 'auto',
          marginTop: '24px',
          width: '100%'
        }}
      >
        <Stack direction={setDirection()}>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Branch" />
            <Details title={odAccDetails?.branchName || 'N/A'} />

            <SubTitle title="Facility Amount" />
            <Details title={odAccDetails?.amount || 'N/A'} />

            <SubTitle title="Posting Date" />
            <Details
              title={
                moment(odAccDetails.reportDate).format(
                  'MMMM Do YYYY, h:mm:ss a'
                ) || 'N/A'
              }
            />

            <SubTitle title="Overdraft Status" />
            <Status label={odAccDetails.status} status="success" />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Facility Type" />
            <Details title={odAccDetails?.facilityType || 'N/A'} />

            <SubTitle title="Penal Rate" />
            <Details title={odAccDetails?.penaltyRate || 'N/A'} />

            <SubTitle title="Start Date" />
            <Details
              title={
                moment(odAccDetails.effective_dt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                ) || 'N/A'
              }
            />
          </Box>
          <Box mt={2} sx={{ width: '303px' }}>
            <SubTitle title="Facility Rate" />
            <Details title={odAccDetails?.interestRate || 'N/A'} />

            <SubTitle title="Facility Term(%)" />
            <Details title={odAccDetails?.interestFrequency || 'N/A'} />

            <SubTitle title="Expiry Date" />
            <Details
              title={
                moment(odAccDetails.expiryDate).format(
                  'MMMM Do YYYY, h:mm:ss a'
                ) || 'N/A'
              }
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewSingleOverDraftDetails;
