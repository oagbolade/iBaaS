import React from 'react';
import { Box, ClickAwayListener, Grid, Typography } from '@mui/material';
import {
  searchgroupContainer,
  menuTypography,
  menuTypographyBackground,
} from '../styles';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  handleMenuItemClick?: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // eslint-disable-next-line no-unused-vars
    index: number,
  ) => void;
  options?: Array<string>;
  handleClose: any;
};

export const BasicSearchGroup = ({
  handleClose,
  handleMenuItemClick,
  options,
}: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          ...searchgroupContainer,
        }}
      >
        <Grid container spacing={2}>
          <Grid mb={1} item mobile={12} tablet={12} justifyContent="center">
            <TextInput
              customStyle={{
                width: setWidth(),
                ...inputFields,
                fontSize: '12px',
                height: '28px',
              }}
              icon={<SearchIcon />}
              name="customerID"
              placeholder="Search"
            />{' '}
          </Grid>
        </Grid>

        {options?.map((option, index) => (
          <Box
            onClick={(event) => handleMenuItemClick?.(event, index)}
            key={index}
            sx={{ ...menuTypographyBackground }}
          >
            <Typography sx={{ ...menuTypography }}>{option}</Typography>
          </Box>
        ))}
      </Box>
    </ClickAwayListener>
  );
};
