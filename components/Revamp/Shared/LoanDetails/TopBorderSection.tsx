import React from 'react';
import { Box, Stack } from '@mui/material';
import { topBorderSection } from './styles';
// eslint-disable-next-line import/no-cycle
import { Details, SubTitle } from './LoanDetails';
import { Status } from '@/components/Labels';

export const TopBorderSection = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={0.2}
      sx={{
        ...topBorderSection
      }}
    >
      <Box>
        <SubTitle title="Request" />
        <Details title="Loan Cancellation" />
      </Box>
      <Box>
        <SubTitle title="Requested By" />
        <Details title="Opeyemi Olatogun" />
      </Box>
      <Box>
        <SubTitle title="Request Date" />
        <Details title="02 March, 2023" />
      </Box>
      <Box>
        <SubTitle title="Status" />
        <Status label="Pending Approval" status="warning" />
      </Box>
    </Stack>
  );
};
