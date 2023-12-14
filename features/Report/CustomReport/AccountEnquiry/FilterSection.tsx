import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import {
  LargeFormMultiSelectField,
  TextInput,
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { Account } from '@/constants/Loan/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import {
  backButtonContainer,
  backStyle,
  backTitle,
  inputFields,
  buttonStyle,
} from './style';

export const FilterSection = () => {
  const { setWidth } = useCurrentBreakpoint();

  return (
    <Box sx={{ display: 'flex', marginTop: '30px', padding: '25px' }}>
      <TextInput
        customStyle={{
          width: setWidth(),
          ...inputFields,
        }}
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
      />
      <ActionButton buttonTitle="Search" customStyle={{ ...buttonStyle }} />
    </Box>
  );
};
