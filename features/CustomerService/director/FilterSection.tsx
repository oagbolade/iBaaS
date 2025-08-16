import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { FormTextInput } from '@/components/FormikFields';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('directors');
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    search: searchParams?.fullName ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      fullName: values.search.toString().length > 0 ? values.search : null
    };

    onSearch(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Box sx={{ height: '120px' }}>
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={11}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="search"
                placeholder="Search by director name"
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
              <ActionButton type="submit" buttonTitle="Search" />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
