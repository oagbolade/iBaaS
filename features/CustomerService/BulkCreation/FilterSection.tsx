import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from './styles';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('bulk-customer-creation');
  const { setWidth } = useCurrentBreakpoint();
  const initialValues = {
    docType: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    fullName: searchParams?.fullName ?? '',
    customerID: searchParams?.customerID ?? ''
  };
  const onSubmit = async (values: any) => {
    onSearch?.(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={{}}
    >
      <Form data-testid="search-form">
        <Box>
          <Grid container spacing={2}>
            <Grid item mobile={12} tablet={4} justifyContent="center">
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                name="docType"
                options={[{ name: 'Select file ', value: '' }]}
                label="Document Type"
              />{' '}
            </Grid>

            <Grid
              mb={{ tablet: 7 }}
              item
              mobile={4}
              tablet={7}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="documnntName"
                placeholder="Search by document Name"
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
