import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { buttonBackgroundColor } from './style';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { Form, Formik } from 'formik';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('account-debit');
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    searchWith: searchParams?.searchWith ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      searchWith: values.searchWith.length > 0 ? values.searchWith : undefined
    };

    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form>
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
                  <FormSelectField
                    customStyle={{
                      width: '400px',
                      fontSize: '14px',
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch ID"
                  />{' '}
                </Grid>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={6}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: '500px',
                      fontSize: '14px',
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="searchWith"
                    placeholder="Search a customer by Name or Account Number"
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
                  <ActionButton
                    type="submit"
                    customStyle={buttonBackgroundColor}
                    buttonTitle="Search"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
