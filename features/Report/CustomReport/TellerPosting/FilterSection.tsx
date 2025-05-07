import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { buttonBackgroundColor } from '../AccountDebit/style';
import { TextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Report/CustomReport/style';
import { ITellerPostingParams } from '@/api/reports/useGetTellerPosting';

type Props = {
  onSearch: (params: ITellerPostingParams | null) => void;
};

export const FilterSection = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    const searchParams = {
      search: searchTerm || undefined
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
            mb={{ tablet: 6 }}
            item
            mobile={12}
            tablet={6}
            justifyContent="center"
          >
            <TextInput
              customStyle={{
                width: '600px',
                fontSize: '14px',
                ...inputFields
              }}
              icon={<SearchIcon />}
              name="search"
              value={searchTerm}
              placeholder="Search a Teller or User ID"
              label="Teller/User ID"
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
