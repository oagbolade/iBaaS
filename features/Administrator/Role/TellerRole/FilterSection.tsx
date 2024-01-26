import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import colors from '@/assets/colors';

export const FilterSection = () => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          mb={{ tablet: 6 }}
          item
          mobile={12}
          tablet={3}
          justifyContent="center"
        >
          <TextInput
            customStyle={{
              width: setWidth(),
              fontSize: '14px',
              ...inputFields,
            }}
            name="search"
            placeholder="46362727"
            label="Customer ID"
          />{' '}
        </Grid>
        <Grid
          mb={{ tablet: 6 }}
          item
          mobile={12}
          tablet={3}
          justifyContent="center"
        >
          <FormSelectInput
            customStyle={{
              width: setWidth(),
              fontSize: '14px',
              ...inputFields,
            }}
            name="customerType"
            options={Loan.status}
            label="Customer Type"
            placeholder="All"
          />{' '}
        </Grid>
        <Grid
          mb={{ tablet: 6 }}
          item
          mobile={12}
          tablet={5}
          justifyContent="center"
        >
          <TextInput
            customStyle={{
              width: setWidth(),
              fontSize: '14px',
              ...inputFields,
            }}
            icon={<SearchIcon />}
            name="search"
            placeholder="Search"
            label="Customer Name"
          />{' '}
        </Grid>
        <Grid
          item
          mobile={12}
          tablet={1}
          sx={{ display: 'flex' }}
          justifyContent="flex-end"
          mt={{ tablet: 3.2 }}
          mr={{ mobile: 30, tablet: 0 }}
          mb={{ mobile: 6, tablet: 0 }}
        >
          <ActionButton
            customStyle={{
              backgroundColor: `${colors.activeBlue400}`,
              border: `1px solid ${colors.activeBlue400}`,
              color: `${colors.white}`,
            }}
            buttonTitle="Search"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
