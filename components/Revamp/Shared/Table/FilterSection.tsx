import React, { useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { NestedMenu } from '@/components/Revamp/Menu/NestedMenu';

export const FilterSection = () => {
  const { setWidth, isTablet } = useCurrentBreakpoint();
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    return setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    return setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          ml={{ mobile: 1, desktop: 0 }}
          mt={{ mobile: 3, desktop: 0 }}
          item={isTablet}
          mobile={12}
          tablet={4}
          justifyContent="center"
        >
          <Button
            onClick={(e) => {
              return handleClick(e);
            }}
          >
            <TextInput
              customStyle={{
                width: setWidth(),
                ...inputFields
              }}
              icon={<FilterListIcon />}
              name="filter"
              placeholder="Filter"
              disabled
            />{' '}
          </Button>
          <NestedMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
          />
        </Grid>
        <Grid
          mt={{ desktop: 0.7 }}
          item
          mobile={12}
          tablet={8}
          justifyContent="center"
        >
          <TextInput
            customStyle={{
              width: setWidth(),
              ...inputFields
            }}
            icon={<SearchIcon />}
            name="search"
            placeholder="Search"
          />{' '}
        </Grid>
      </Grid>
    </Box>
  );
};
