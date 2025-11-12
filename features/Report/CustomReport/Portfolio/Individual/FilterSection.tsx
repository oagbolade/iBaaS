import { Grid } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { inputFields } from '../../style';
import { buttonBackgroundColor } from '../style';
import { IBranches } from '@/api/ResponseTypes/general';
import { FormSelectInput, TextInput } from '@/components/FormikFields';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { SearchIcon } from '@/assets/svg';
import { ActionButton } from '@/components/Revamp/Buttons';

type Props = {
  branches?: IBranches[];
  onSearch: Function;
  branchCode?: string;
};

export const FilterSection = ({ branches, onSearch, branchCode }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(branchCode || '' );

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const handleSearchClick = () => {
    const searchParams = {
      branchCode: selectedBranch || undefined,
      searchWith: searchTerm || undefined
    };
    onSearch(searchParams);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        mb={{ tablet: 4 }}
        item
        mobile={12}
        tablet={4}
        justifyContent="center"
      >
        <FormSelectInput
          customStyle={{
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
        mb={{ tablet: 7 }}
        item
        mobile={12}
        tablet={7}
        justifyContent="center"
      >
        <TextInput
          customStyle={{
            ...inputFields
          }}
          icon={<SearchIcon />}
          name="search"
          value={searchTerm}
          placeholder="Search a customer by Name or Account Number"
          label="Account Number/Name"
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
