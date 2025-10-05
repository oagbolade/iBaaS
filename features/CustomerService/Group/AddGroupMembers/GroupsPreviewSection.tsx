'use client';
import React from 'react';
import { Box, Divider, IconButton, Stack } from '@mui/material';
import { pageTitle } from './styles';
import { PageTitle } from '@/components/Typography';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { DeleteIcon } from '@/assets/svg';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

export interface IGroup {
  customerName: string;
  customerId: string;
}

type Props = {
  groups: IGroup[];
  handleSetGroups: Function;
};

export const GroupsPreviewSection = ({ groups, handleSetGroups }: Props) => {
  const removeGroup = (memberId: string) => {
    const filterGroups = groups.filter(
      (group) => group.customerId !== memberId
    );
    handleSetGroups(filterGroups);
  };

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '100%'
      }}
    >
      <PageTitle styles={pageTitle} title="List of Accelerators Members" />
      <Divider sx={{ margin: '20px 0', width: '100%' }} />
      {groups.length === 0 && (
        <Box mb={3} sx={{ width: '200px', height: '200px' }}>
          <NoDataAvailable
            message="No group member added"
            width={200}
            height={200}
          />
        </Box>
      )}
      {groups.map((group) => (
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <SubTitle title={`Member ID - ${group.customerId}`} />
            <Details title={`${group.customerName}`} />
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
              onClick={() => removeGroup(group.customerId)}
              edge="end"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
