import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CheckboxInput, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';

type Props = {
  labels: Array<string>;
};

export const SearchLoanFilters = ({ labels }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '240px',
        padding: '16px 6px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item mobile={12} tablet={12} justifyContent="center">
          <TextInput
            customStyle={{
              ...inputFields,
              width: setWidth(),
              height: '38px',
              padding: '10px 12px',
            }}
            icon={<SearchIcon />}
            name="search"
            placeholder="Search"
          />{' '}
        </Grid>
        <Grid ml={2} item mobile={12} tablet={12} justifyContent="center">
          {labels.map((label) => {return (
            <CheckboxInput label={label} />
          );})}
        </Grid>
      </Grid>
    </Box>
  );
};
