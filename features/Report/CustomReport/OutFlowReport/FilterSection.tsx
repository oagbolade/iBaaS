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
import { IInflowOutflowParams } from '@/api/reports/useGetInflowOutflowReport';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { Form, Formik } from 'formik';

type Props = {
  branches?: IBranches[];
  onSearch: (params: IInflowOutflowParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } =
    usePersistedSearch<IInflowOutflowParams>('outflow-report');

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchId: searchParams?.branchId ?? '',
    tellerId: searchParams?.tellerId ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: IInflowOutflowParams = {
      branchId: values.branchId.toString().length > 0 ? values.branchId : null,
      tellerId: values.tellerId.length > 0 ? values.tellerId : undefined
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
                name="branchId"
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
                icon={<SearchIcon />}
                name="search"
                placeholder="Search by account number or name"
                label="Account Number/Name"
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
        </Form>
      )}
    </Formik>
  );
};
