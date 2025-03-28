import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../style';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';

type Props = {
  branches?: IBranches[];
  onSearch: (params: LoanOverdueParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProduct, setSelectedproduct] = useState('');

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const handleSearchClick = () => {
    const searchParams = {
      branch: selectedBranch || null,
      search: searchTerm || null,
      product: selectedProduct || null
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
            sx={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <FormSelectInput
              customStyle={{
                width: '300px',
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
            <FormSelectInput
              customStyle={{
                width: '300px',
                fontSize: '14px',
                ...inputFields
              }}
              name="Product"
              options={mappedBranches}
              label="Product"
              value={selectedProduct}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedproduct(e.target.value)
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
                width: '300px',
                fontSize: '14px',
                ...inputFields
              }}
              icon={<SearchIcon />}
              name="search"
              value={searchTerm}
              placeholder="Search a customer by Name or Account Number"
              label="Search"
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
