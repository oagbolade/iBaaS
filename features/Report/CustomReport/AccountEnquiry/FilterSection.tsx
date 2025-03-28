import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { buttonBackgroundColor } from './style';
import {
  FormSelectField,
  FormSelectInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';

type Props = {
  branches?: IBranches[];
  onSearch: (params: IEnquiryParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const handleSearchClick = () => {
    const searchParams = {
      branchId: selectedBranch || undefined,
      customerId: searchTerm || undefined
    };

    onSearch(searchParams);
  };

  return (
    <Box>
      <Box sx={{ height: '120px' }}>
        <Grid
          sx={{ padding: '15px 30px', display: 'flex', gap: '35px' }}
          spacing={2}
        >
          <Grid
            mb={{ tablet: 3 }}
            item
            mobile={12}
            tablet={5}
            justifyContent="center"
          >
            <FormSelectInput
              customStyle={{
                width: '400px',
                fontSize: '14px',
                ...inputFields
              }}
              name="branchID"
              options={mappedBranches}
              label="Branch ID"
              value={selectedBranch}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedBranch(e.target.value)
              }
            />{' '}
          </Grid>
          <Grid
            mb={{ tablet: 6 }}
            item
            mobile={12}
            tablet={6}
            justifyContent="center"
          >
            <TextInput
              customStyle={{
                width: '500px',
                fontSize: '14px',
                ...inputFields
              }}
              icon={<SearchIcon />}
              name="search"
              value={searchTerm}
              placeholder="Search a customer by Name or Account Number"
              label="Customer ID"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
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
              onClick={handleSearchClick}
              customStyle={buttonBackgroundColor}
              buttonTitle="Search"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
