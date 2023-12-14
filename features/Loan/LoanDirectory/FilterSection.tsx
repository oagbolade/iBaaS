import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from './styles';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { ActionButton } from '@/components/Revamp/Buttons';

export const FilterSection = () => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item mobile={12} tablet={2} justifyContent="center">
          <FormSelectInput
            customStyle={{
              width: setWidth(),
              ...inputFields,
            }}
            name="branchID"
            options={Loan.branchID}
            label="Branch ID"
          />{' '}
        </Grid>
        <Grid mb={6} item mobile={12} tablet={2} justifyContent="center">
          <FormSelectInput
            customStyle={{
              width: setWidth(),
              ...inputFields,
            }}
            name="loanStatus"
            options={Loan.status}
            label="Loan Status"
          />{' '}
        </Grid>
        <Grid mb={6} item mobile={12} tablet={7} justifyContent="center">
          <TextInput
            customStyle={{
              width: setWidth(),
              ...inputFields,
            }}
            icon={<SearchIcon />}
            name="customerID"
            placeholder="Enter Customer ID"
            label="Customer ID"
          />{' '}
        </Grid>
        <Grid
          item
          mobile={12}
          tablet={1}
          sx={{ display: 'flex' }}
          justifyContent="flex-end"
          mt={3.2}
          mr={{ mobile: 30, tablet: 0 }}
        >
          <ActionButton buttonTitle="Search" />
        </Grid>
      </Grid>
    </Box>
  );
};
