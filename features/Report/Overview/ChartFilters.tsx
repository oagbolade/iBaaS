import React from 'react';
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import Link from 'next/link';
import { transactionVolumeStyle, allBranchesStyle } from './styles';
import colors from '@/assets/colors';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';
import { StyledMenu } from '@/components/Table';

export interface Ifilter {
  filter: Array<'ALL_BRANCHES' | 'TRANSACTION_VOLUME' | 'AMOUNT' | 'DATE'>;
}

type Props = {
  filter: Ifilter['filter'];
};

const MenuWrapper = styled.section`
  .MuiBox-root {
    padding: 0 10px;
    border: none;
  }
`;

export const ChartFilters = ({ filter }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Todo: make options reusable
  const branchOptions = [
    'All',
    'Gbagada Branch',
    'Festac Branch',
    'Yaba Branch',
    'Coker Branch',
    'Somolu Branch'
  ];

  return (
    <Stack direction="row" justifyContent="flex-start" spacing={1.5}>
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

      {filter.includes('DATE') && (
        <div>
          <Button
            onClick={handleClick}
            sx={{
              ...allBranchesStyle,
              textTransform: 'none',
              fontSize: '14px',
              fontFamily: 'Averta Regular',
              backgroundColor: `${colors.gray800}`
            }}
            endIcon={
              <ChevronDown
                color={`${colors.Heading}`}
                props={{ width: '12px', height: '12px' }}
              />
            }
          >
            This Week
          </Button>

          <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuWrapper>
              <MenuItem>
                <span>Today</span>
              </MenuItem>

              <MenuItem>
                <span>Yesterday</span>
              </MenuItem>

              <MenuItem>
                <span>This Week</span>
              </MenuItem>

              <MenuItem>
                <span>This Month</span>
              </MenuItem>

              <MenuItem>
                <span>Last 3 Months</span>
              </MenuItem>

              <MenuItem>
                <span>Last 6 Months</span>
              </MenuItem>

              <MenuItem>
                <span>Last Year</span>
              </MenuItem>

              <MenuItem>
                <span>Custom Date</span>
              </MenuItem>
            </MenuWrapper>
          </StyledMenu>
        </div>
      )}

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
