import React from 'react';
import { Box, Stack } from '@mui/material';
import { transactionVolumeStyle, allBranchesStyle } from './styles';
import colors from '@/assets/colors';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';

export interface Ifilter {
  filter: Array<'ALL_BRANCHES' | 'TRANSACTION_VOLUME' | 'AMOUNT'>;
}

type Props = {
  filter: Ifilter['filter'];
};

export const ChartFilters = ({ filter }: Props) => {
  // Todo: make options reusable
  const branchOptions = [
    'All',
    'ID-475747  Gbagada Branch',
    'ID-475748  Festac Branch',
    'ID-475749  Yaba Branch',
    'ID-475750  Coker Branch',
    'ID-475751  Somolu Branch'
  ];

  return (
    <Stack
      mt={2}
      mb={4}
      direction="row"
      justifyContent="flex-start"
      spacing={0}
    >
      {filter.includes('TRANSACTION_VOLUME') && (
        <ActionButtonWithPopper
          options={transactionVolumeOptions}
          customStyle={{ ...transactionVolumeStyle }}
          icon={
            <ChevronDown
              color={`${colors.Heading}`}
              props={{ width: '12px', height: '12px' }}
            />
          }
          iconPosition="end"
          buttonTitle="Transaction Volume"
        />
      )}
      <Box ml={3} />

      {filter.includes('ALL_BRANCHES') && (
        <ActionButtonWithPopper
          searchGroupVariant="BasicSearchGroup"
          options={branchOptions}
          customStyle={{ ...allBranchesStyle }}
          icon={
            <ChevronDown
              color={`${colors.Heading}`}
              props={{ width: '12px', height: '12px' }}
            />
          }
          iconPosition="end"
          buttonTitle="All Branches"
        />
      )}

      <Box ml={3} />
      {filter.includes('AMOUNT') && (
        <ActionButtonWithPopper
          searchGroupVariant="BasicSearchGroup"
          options={branchOptions}
          customStyle={{ ...allBranchesStyle }}
          icon={
            <ChevronDown
              color={`${colors.Heading}`}
              props={{ width: '12px', height: '12px' }}
            />
          }
          iconPosition="end"
          buttonTitle="Amount"
        />
      )}
    </Stack>
  );
};
