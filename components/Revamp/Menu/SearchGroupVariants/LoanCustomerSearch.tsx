import React from 'react';
import { Box, ClickAwayListener, Grid, Typography } from '@mui/material';
import {
  searchgroupContainer,
  menuTypography,
  menuTypographyBackground
} from '../styles';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  handleMenuItemClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    value: string
  ) => void;
  options?: any[];
  handleClose: any;
  onChange?: Function;
  searchValue?: string;
  name?: string;
  autoFocus?: boolean;
  loading?: boolean;
};

export const LoanCustomerSearch = ({
  handleClose,
  handleMenuItemClick,
  options,
  onChange,
  searchValue,
  name,
  autoFocus,
  loading
}: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          ...searchgroupContainer
        }}
      >
        <Grid container spacing={2}>
          <Grid mb={1} item mobile={12} tablet={12} justifyContent="center">
            <TextInput
              autoFocus={autoFocus}
              customStyle={{
                width: setWidth(),
                ...inputFields,
                fontSize: '12px',
                height: '28px'
              }}
              icon={<SearchIcon />}
              name={name}
              placeholder="Loan customer Search"
              onChange={onChange}
              value={searchValue}
            />{' '}
          </Grid>
        </Grid>
        {loading && 'Loading...'}
        {options?.map((option, index) => (
          <Box
            onClick={(event) => handleMenuItemClick?.(event, index, option)}
            key={index}
            sx={{ ...menuTypographyBackground }}
          >
            <div className="flex items-center">
              <div className="w-1/2">
                <Typography sx={{ ...menuTypography }}>
                  {option?.customer.accounttitle}
                </Typography>
              </div>

              <div>
                <Typography sx={{ ...menuTypography }}>
                  BVN - {option?.customer.bvn}
                </Typography>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/2">
                <Typography sx={{ ...menuTypography }}>
                  Acc.No - {option?.customer.accountnumber}
                </Typography>
              </div>

              <div>
                <Typography sx={{ ...menuTypography }}>
                  Phone - {option?.customer.phone}
                </Typography>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </ClickAwayListener>
  );
};
