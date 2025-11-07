import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from './style';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('account-debit');
  const { mappedBranches } = useMapSelectOptions({
    branches
  });
  const { setWidth } = useCurrentBreakpoint();

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
          <Box
           sx={{
              marginTop: '30px',
              paddingX: '24px'
            }}>
            <Grid container spacing={2}>
              <Grid item mobile={12} tablet={3} justifyContent="center">
                <FormSelectField
                  customStyle={{
                    width: setWidth(),
                    ...inputFields
                  }}
                  name="branchID"
                  options={mappedBranches}
                  label="Branch ID"
                />{' '}
              </Grid>
              <Grid item mobile={12} tablet={8} justifyContent="center">
                <FormTextInput
                  customStyle={{
                    width: setWidth(),
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
        </Form>
      )}
    </Formik>
  );
};
