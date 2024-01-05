import React from 'react';
import { Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields, buttonStyle } from './style';
import {
  LargeFormMultiSelectField,
  TextInput,
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { Account } from '@/constants/Loan/selectOptions';

export const FilterSection = () => {
  const { setDirection } = useCurrentBreakpoint();
  return (
    <Box sx={{ display: 'flex', marginTop: '30px', padding: '25px' }}>
      <Stack direction={setDirection()} ml={{ mobile: 4, tablet: 0 }}>
        <TextInput
          icon={<SearchIcon />}
          name="UserID"
          placeholder="Enter User ID"
          label="User ID"
        />
        <LargeFormMultiSelectField
          label="Customer ID"
          options={Account.account}
          icon={<SearchIcon />}
          placeholder="Search a customer by Name or Account Number"
          customStyle={{ ...inputFields }}
        />
        <ActionButton buttonTitle="Search" customStyle={{ ...buttonStyle }} />
      </Stack>
    </Box>
  );
};
