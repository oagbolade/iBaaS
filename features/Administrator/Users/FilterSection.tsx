import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

type Props = {
  onSearch: () => void | undefined | number;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item mobile={12} tablet={2} justifyContent="center">
          <RadioButtons
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Deleted', value: 'deleted' },
            ]}
            title="User Status"
            name="status"
            value="active"
          />
        </Grid>
        <Grid
          mb={{ tablet: 6 }}
          item
          mobile={12}
          tablet={2}
          justifyContent="center"
        >
          <FormSelectInput
            customStyle={{
              width: setWidth(),
              fontSize: '14px',
              ...inputFields,
            }}
            name="loanStatus"
            options={Loan.status}
            label="Branch ID"
            placeholder="Please Enter"
          />{' '}
        </Grid>
        <Grid
          mb={{ tablet: 6 }}
          item
          mobile={12}
          tablet={7}
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
            label="Search"
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
          <ActionButton onClick={onSearch} buttonTitle="Search" />
        </Grid>
      </Grid>
    </Box>
  );
};
