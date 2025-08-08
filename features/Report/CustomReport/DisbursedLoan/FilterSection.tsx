import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../style';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';

type Props = {
  branches?: IBranches[];
  onSearch: (params: LoanOverdueParams | null) => void;
  bankproducts: IBankProducts[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, bankproducts }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProduct, setSelectedproduct] = useState('');

  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
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
    <Grid sx={{ padding: '5px 5px', display: 'flex', gap: '35px' }} spacing={2}>
      <Grid
        mb={{ tablet: 3}}
        item
        mobile={12}
        tablet={3}
        sx={{ display: 'flex', alignItems: 'center', gap: 5 }}
      >
        <FormSelectInput
          name="branchID"
          options={mappedBranches}
          label="Branch ID"
          required
          value={selectedBranch}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSelectedBranch(e.target.value)
          }
        />{' '}
        <FormSelectInput
          name="Product"
          options={mappedBankproducts}
          label="Product"
          value={selectedProduct}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSelectedproduct(e.target.value)
          }
        />{' '}
      </Grid>
      <Grid
        mb={{ tablet: 2 }}
        item
        mobile={12}
        tablet={2}
        justifyContent="center"
      >
        <TextInput
          icon={<SearchIcon />}
          name="search"
          value={searchTerm}
          placeholder="Search for Account Number"
          label="Search for Account Number"
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
  );
};
