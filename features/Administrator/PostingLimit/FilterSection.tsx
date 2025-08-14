import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IBranches } from '@/api/ResponseTypes/general';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch: Function;
  branches: IBranches[];
};

export const FilterSection = ({ onSearch, branches }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('posting-limit');
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({ branches });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    branchCredit: searchParams?.branchCredit ?? '',
    branchDebit: searchParams?.branchDebit ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchCredit:
        values.branchCredit.toString().length > 0 ? values.branchCredit : null,
      branchDebit:
        values.branchDebit.toString().length > 0 ? values.branchDebit : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
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
        <Box>
          <Grid container spacing={2}>
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
                name="branchID"
                options={mappedBranches}
                label="Branch ID"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={4}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields,
                }}
                icon={<SearchIcon />}
                name="branchCredit"
                placeholder="Search by Branch Credit"
                label="Search by Branch Credit"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={4}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields,
                }}
                icon={<SearchIcon />}
                name="branchDebit"
                placeholder="Search by Branch Debit"
                label="Search by Branch Debit"
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
