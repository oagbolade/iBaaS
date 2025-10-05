'use client';
import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { DeleteIcon } from '@/assets/svg';
import { IDirectorDetails } from '@/api/ResponseTypes/customer-service';

type Props = {
  directorDetail: IDirectorDetails;
  deleteDirector: Function;
};

export const DirectorsInfoSection = ({
  directorDetail,
  deleteDirector
}: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box
        mb={{ mobile: 30, tablet: 0 }}
        sx={{
          padding: { mobile: 6, tablet: 0 },
          alignItems: { mobile: 'center', tablet: 'normal' }
        }}
      >
        <SubTitle title="Directors ID" />
        <Details title={directorDetail?.fullName || 'N/A'} />
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Box>{directorDetail?.isCeo && <SubTitle title="Rank - CEO" />}</Box>
        <Box>
          {directorDetail?.isChairman && <SubTitle title="Rank - CHAIRMAN" />}
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start'
          }}
        >
          <IconButton
            onClick={() => deleteDirector(directorDetail?.id)}
            edge="end"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};
