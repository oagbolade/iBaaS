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
import { OptionsI } from '@/components/FormikFields/FormSelectField';

type Props = {
  handleMenuItemClick?: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // eslint-disable-next-line no-unused-vars
    index: number,
    // eslint-disable-next-line no-unused-vars
    value: string
  ) => void;
  options?: OptionsI[];
  handleClose: any;
  onChange?: Function;
  searchValue?: string;
  name?: string;
  autoFocus?: boolean;
  loading?: boolean;
};

export const GlSearchGroup = ({
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
              placeholder="Search"
              onChange={onChange}
              value={searchValue}
            />{' '}
          </Grid>
        </Grid>
        {loading && 'Loading...'}
        {options?.map((option, index) => (
          <Box
            onClick={(event) =>
              handleMenuItemClick?.(
                event,
                index,
                option.value
              )
            }
            key={index}
            sx={{ ...menuTypographyBackground }}
          >
            <Typography sx={{ ...menuTypography }}>{option.name}</Typography>
          </Box>
        ))}
      </Box>
    </ClickAwayListener>
  );
};
