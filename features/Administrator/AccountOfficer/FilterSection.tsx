import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IBranches, IStatus } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch: Function;
  branches: IBranches[];
  status: IStatus[];
};

export const FilterSection = ({ onSearch, branches, status }: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('account-officers');
  const { mappedBranches, mappedStatus } = useMapSelectOptions({
    branches,
    status,
  });
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    search: searchParams?.fullName ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status.toString().length > 0 ? values.status : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      fullName: values.search.length > 0 ? values.search : null,
    };

    onSearch(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={searchFieldsSchema}
    >
      {() => (
        <Form>
          <Box>
            <Grid container spacing={2}>
              <Grid
                mb={{ tablet: 3 }}
                item
                mobile={12}
                tablet={2}
                justifyContent="center"
              >
                <FormSelectField
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields,
                  }}
                  name="branchID"
                  options={mappedBranches}
                  label="Branch ID"
                />{' '}
              </Grid>
              <Grid
                mb={{ tablet: 3 }}
                item
                mobile={12}
                tablet={2}
                justifyContent="center"
              >
                <FormSelectField
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields,
                  }}
                  name="status"
                  options={mappedStatus}
                  label="User Status"
                />{' '}
              </Grid>
              <Grid
                mb={{ tablet: 6 }}
                item
                mobile={12}
                tablet={7}
                justifyContent="center"
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields,
                  }}
                  icon={<SearchIcon />}
                  name="search"
                  placeholder="Search by officer name"
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
      )}
    </Formik>
  );
};
