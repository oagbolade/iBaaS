import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches, IStatus } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch: Function;
  branches: IBranches[];
  status: IStatus[];
};

export const AccountFilterSection = ({ onSearch, branches, status }: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('account-overview');
  const { mappedBranches, mappedStatus } = useMapSelectOptions({
    branches,
    status,
  });
  const { setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status.toString().length > 0 ? values.status : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      accountNumber: values.search.toString().length > 0 ? values.search : null,
    };

    onSearch(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={searchFieldsSchema}
    >
      <Form>
        <Box sx={{ height: '120px' }}>
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 6 }}
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
              mb={{ tablet: 6 }}
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
                label="Status"
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
                placeholder="Search by account number"
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
