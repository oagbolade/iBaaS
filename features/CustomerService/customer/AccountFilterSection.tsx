import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches, IProductType, IStatus } from '@/api/ResponseTypes/general';
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
  productTypes: IProductType[] | Array<any>;
};

export const AccountFilterSection = ({
  onSearch,
  branches,
  status,
  productTypes
}: Props) => {
    const { searchParams } =
      usePersistedSearch<ISearchParams>('account-overview');
  const { mappedBranches, mappedStatus, mappedProductClass } =
    useMapSelectOptions({
      branches,
      status,
      productTypes
    });
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    accountType: searchParams?.accountType ?? '',
    search: searchParams?.accountNumber ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status.toString().length > 0 ? values.status : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      accountNumber: values.search.toString().length > 0 ? values.search : null,
      accountType:
        values.accountType.toString().length > 0 ? values.accountType : null
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
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
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
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="accountType"
                options={mappedProductClass}
                label="Account Type"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 4 }}
              item
              mobile={8}
              tablet={4}
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
