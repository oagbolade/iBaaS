import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from './styles';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { Loan } from '@/constants/Loan/selectOptions';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { loanUnderwritingSearchSchema } from '@/schemas/loan/index';

type Props = {
  onSearch?: Function;
  branches?: IBranches[];
};

export const FilterSection = ({ onSearch, branches }: Props) => {
  const { mappedBranches } = useMapSelectOptions({
    branches
  });
  const { setWidth } = useCurrentBreakpoint();
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status === '' ? null : values.status,
      fullName: values.fullName,
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      customerID:
        values.customerID?.toString().trim().length > 0
          ? values.customerID
          : null
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={loanUnderwritingSearchSchema}
    >
      <Form data-testid="search-form">
        <Box>
          <Grid container spacing={2}>
            <Grid item mobile={12} tablet={2} justifyContent="center">
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
                  ...inputFields
                }}
                name="status"
                options={Loan.status}
                label="Loan Status"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 3 }}
              item
              mobile={4}
              tablet={3}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                type="number"
                icon={<SearchIcon />}
                name="customerID"
                placeholder="Enter Customer ID"
                label="Customer ID"
              />{' '}
            </Grid>

            <Grid
              mb={{ tablet: 4 }}
              item
              mobile={4}
              tablet={4}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="fullName"
                placeholder="Enter Customer Name"
                label="Customer Name"
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
