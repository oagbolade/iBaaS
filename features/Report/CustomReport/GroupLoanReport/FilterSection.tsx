import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      search: values.search?.toString().trim().length > 0 ? values.search : null
    };
    onSearch?.(params);
  };

  return (
    
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <Box sx={{ height: '120px' }}>
            <Grid
              sx={{ padding: '5px 5px', display: 'flex', gap: '35px' }}
              spacing={2}
            >
              <Grid
                mb={{ tablet: 3 }}
                item
                mobile={12}
                tablet={5}
                justifyContent="center"
              >
                <FormSelectField
                  customStyle={{
                    width: '400px',
                    fontSize: '14px',
                    ...inputFields
                  }}
                  name="branchID"
                  options={mappedBranches}
                  label="Branch ID"
                />
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
                    fontSize: '14px',
                    ...inputFields
                  }}
                  icon={<SearchIcon />}
                  name="search"
                  placeholder="Search by teller ID"
                  label="Teller ID"
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
                  customStyle={buttonBackgroundColor}
                  type="submit"
                  buttonTitle="Search"
                />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
   
  );
};
