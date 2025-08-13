import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../LoanDirectory/styles';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches, IStatus } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { overDraftSearchSchema } from '@/schemas/loan/index';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: Function;
  branches?: IBranches[];
  status: IStatus[];
};

export const FilterSection = ({ onSearch, branches, status }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('overdraft');
  const { mappedBranches, mappedStatus } = useMapSelectOptions({
    branches,
    status,
  });
  const { setWidth } = useCurrentBreakpoint();
  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    accountNumber: searchParams?.accountNumber ?? '',
  };
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID ? values.branchID : null,
      status: values.status ? values.status : null,
      accountNumber: values.accountNumber ? values.accountNumber : null,
    };

    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={overDraftSearchSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item mobile={12} tablet={3} justifyContent="center">
            <FormSelectField
              customStyle={{
                width: setWidth(),
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
            tablet={3}
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
            tablet={5}
            justifyContent="center"
          >
            <FormTextInput
              customStyle={{
                width: setWidth(),
                ...inputFields,
              }}
              type="number"
              icon={<SearchIcon />}
              name="accountNumber"
              placeholder="Enter Customer account number"
              label="Customer Account Number"
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
      </Form>
    </Formik>
  );
};
